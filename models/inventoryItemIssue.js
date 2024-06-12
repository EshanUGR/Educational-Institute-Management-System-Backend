import { Schema, model } from "mongoose";

const inventoryItemIssueSchema = Schema({
  itemId: String,
  problem: String,
});

const InventoryItemIssue = model(
  "InventoryItemIssue",
  inventoryItemIssueSchema
);
export default InventoryItemIssue;
