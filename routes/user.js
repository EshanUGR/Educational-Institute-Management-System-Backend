import { Router } from "express";
import {
  deleteAccount,
  editProfile,
  login,
  register,
} from "../controllers/user.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);

// edit profile
router.patch("/edit-profile", editProfile);
router.delete("/delete-account/:id", deleteAccount);

export default router;
