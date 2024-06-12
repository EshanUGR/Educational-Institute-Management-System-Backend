import { Schema, model } from "mongoose";

const examFeedbackSchema = new Schema(
  {
    Feedback: String,
    Rate: String,
  },
  { timestamps: true }
);

const ExamFeedback = model("examFeedback", examFeedbackSchema);
export default ExamFeedback;
