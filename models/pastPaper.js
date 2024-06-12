import { Schema, model } from "mongoose";

const PastPaperSchema = Schema({
  paper: String,
  subject: String,
  grade: String,
  userId: String,
  result: { type: String, default: "" },
  checkedBy: { type: String, default: "" },
});

const PastPaper = model("PastPaper", PastPaperSchema);
export default PastPaper;
