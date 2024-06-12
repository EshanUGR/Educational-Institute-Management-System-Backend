/* eslint-disable no-unused-vars */
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../middleware/errorHandler.js";
import User from "../models/user.js";

export const register = async (req, res, next) => {
  try {
    const body = req.body;

    const existingUser = await User.findOne({
      email: body.email,
    });

    if (existingUser) {
      next(errorHandler(400, "This email already taken."));
    } else {
      const hashedPwd = bcrypt.hashSync(body.password, 10);
      const newUser = await User.create({
        ...body,
        password: hashedPwd,
      });
      res.status(201).json(newUser);
    }
  } catch (error) {
    next(error);
    console.log(error.message);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found!"));

    const validPwd = bcrypt.compareSync(password, validUser.password);
    if (!validPwd) return next(errorHandler(401, "Wrong credentials!"));

    const token = jwt.sign({ id: validUser._id }, "JWT_SECRET");

    const { password: pass, ...rest } = validUser._doc;
    res.status(200).json({ ...rest, token });
  } catch (error) {
    next(error);
  }
};

export const editProfile = async (req, res, next) => {
  try {
    const { _id: id, ...data } = req.body;

    const validUser = await User.findById(id);
    if (!validUser) return next(errorHandler(404, "User not found!"));

    let userData = data;

    if (data.password === "") {
      userData.password = validUser.password;
    } else {
      const hashedPwd = bcrypt.hashSync(data.password, 10);
      userData.password = hashedPwd;
    }

    const updatedUser = await User.findByIdAndUpdate(
      { _id: validUser._id },
      { $set: userData },
      { new: true }
    );

    const { password: pass, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteAccount = async (req, res, next) => {
  try {
    const { id } = req.params;

    const validUser = await User.findById(id);
    if (!validUser) return next(errorHandler(404, "User not found!"));

    if (validUser) {
      const deletedAccount = await User.findByIdAndDelete(id);
      res.status(200).json(deletedAccount);
    }
  } catch (error) {
    next(error);
  }
};
