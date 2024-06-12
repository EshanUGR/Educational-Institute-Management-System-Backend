import path from "path";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { errorHandler } from "../middleware/errorHandler.js";
import Inventory from "../models/inventory.js";
import User from "../models/user.js";
import InventoryItemIssue from "../models/inventoryItemIssue.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const getAllInventories = async (req, res, next) => {
  try {
    const allInventories = await Inventory.find();
    res.status(201).json(allInventories);
  } catch (error) {
    next(error);
  }
};


export const addInventory = async (req, res, next) => {
  try {
    const authorizedUser = await User.findById(req.user.id);
    if (authorizedUser?.role === "Inventory Manager") {
      const body = req.body;
      const { file } = req.files;

      if (file.size > 2000000) {
        return next(new errorHandler("Image size is too large"));
      }

      let fileName = file.name;
      let splittedFilename = fileName.split(".");
      let newFilename =
        splittedFilename[0] +
        "_" +
        Date.now() +
        "." +
        splittedFilename[splittedFilename.length - 1];

      file.mv(
        path.join(__dirname, "..", "/uploads/inventories", newFilename),
        async (err) => {
          if (err) {
            return next(new errorHandler(err));
          } else {
            const newInventory = await Inventory.create({
              ...body,
              file: newFilename,
            });
            res.status(201).json(newInventory);
          }
        }
      );
    } else {
      next(errorHandler("You don't have access"));
    }
  } catch (error) {
    next(error);
  }
};


export const editInventory = async (req, res, next) => {
  try {
    const authorizedUser = await User.findById(req.user.id);
    if (authorizedUser?.role === "Inventory Manager") {
      const oldInventory = await Inventory.findById(req.body.id);

      const file = req.files;

      if (!file) {
        const updatedInventory = await Inventory.findByIdAndUpdate(
          oldInventory._id,
          { ...req.body, file: oldInventory.file },
          { new: true }
        );

        res.status(200).json(updatedInventory);
      } else {
        // delete old file from upload
        fs.unlink(
          path.join(__dirname, "..", "/uploads/inventories", oldInventory.file),
          async (err) => {
            if (err) {
              return next(errorHandler(err));
            } else {
              const { file } = req.files;

              if (file.size > 2000000) {
                return next(new errorHandler("File size is too large"));
              }

              let fileName = file.name;
              let splittedFilename = fileName.split(".");
              let newFilename =
                splittedFilename[0] +
                "_" +
                Date.now() +
                "." +
                splittedFilename[splittedFilename.length - 1];

              file.mv(
                path.join(__dirname, "..", "/uploads/inventories", newFilename),
                async (err) => {
                  if (err) {
                    return next(errorHandler(err));
                  }
                }
              );


              
              const updatedInventory = await Inventory.findByIdAndUpdate(
                oldInventory._id,
                { ...req.body, file: newFilename },
                { new: true }
              );

              res.status(200).json(updatedInventory);
            }
          }
        );
      }
    } else {
      next(errorHandler("You don't have access"));
    }
  } catch (error) {
    next(error);
  }
};

export const deleteInventory = async (req, res, next) => {
  try {
    const authorizedUser = await User.findById(req.user.id);
    if (authorizedUser?.role === "Inventory Manager") {
      const { id } = req.params;
      const inventory = await Inventory.findById(id);
      const file = inventory?.file;

      // delete file from upload folder
      fs.unlink(
        path.join(__dirname, "..", "/uploads/inventories", file),
        async (err) => {
          if (err) {
            return next(errorHandler(err));
          } else {
            const deletedInventory = await Inventory.findByIdAndDelete(id);
            res.status(200).json({
              data: deletedInventory._id,
              message: `${deletedInventory.name} has been deleted!`,
            });
          }
        }
      );
    } else {
      next(errorHandler("You don't have access"));
    }
  } catch (error) {
    next(error);
  }
};

export const getInventoryIssues = async (req, res, next) => {
  try {
    const inventoryIssues = await InventoryItemIssue.find();

    if (inventoryIssues) res.status(201).json(inventoryIssues);
  } catch (error) {
    next(error);
  }
};

export const addInventoryIssue = async (req, res, next) => {
  try {
    const newInventoryIssue = await InventoryItemIssue.create(req.body);

    if (newInventoryIssue)
      res.status(201).json({ message: "Issue submitted successfully!" });
  } catch (error) {
    next(error);
  }
};

export const deleteInventoryIssue = async (req, res, next) => {
  try {
    const { issueId } = req.params;

    const deletedIssue = await InventoryItemIssue.findByIdAndDelete(issueId);

    if (deletedIssue) {
      res.status(201).json({ message: "Issue fixed success!" });
    }
  } catch (error) {
    next(error);
  }
};
