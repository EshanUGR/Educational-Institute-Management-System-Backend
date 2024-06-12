import { Router } from "express";
import {
  addInventory,
  addInventoryIssue,
  deleteInventory,
  deleteInventoryIssue,
  editInventory,
  getAllInventories,
  getInventoryIssues,
} from "../controllers/inventory.js";
import { verifyUser } from "../middleware/verifyUser.js";

const router = Router();

router.get("/all-inventories", getAllInventories);
router.post("/add-inventory", verifyUser, addInventory);
router.patch("/edit-inventory", verifyUser, editInventory);
router.delete("/delete-inventory/:id", verifyUser, deleteInventory);

router.get("/get-inventory-issues", getInventoryIssues);
router.post("/add-inventory-issue", addInventoryIssue);
router.delete("/delete-inventory-issue/:issueId", deleteInventoryIssue);

export default router;
