import { Schema, model } from "mongoose";

const inventorySchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    file: { type: String, required: true },
  },
  { timestamps: true }
);

const Inventory = model("Inventory", inventorySchema);
export default Inventory;
