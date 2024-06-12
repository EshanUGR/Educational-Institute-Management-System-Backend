import jwt from "jsonwebtoken";
import { errorHandler } from "./errorHandler.js";

export const verifyUser = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return next(errorHandler(401, "Unathorized"));
  jwt.verify(token, "JWT_SECRET", (err, user) => {
    if (err) return next(errorHandler(403, "Forbidden"));
    req.user = user;
    next();
  });
};
