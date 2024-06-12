import { Schema, model } from "mongoose";

const examNoticeSchema = new Schema(
  {
    Description: String,
    Time: String,
    Date: String,
  },
  { timestamps: true }
);

const ExamNotice = model("examNotice", examNoticeSchema);
export default ExamNotice;
