import { Schema, model } from "mongoose";

const StudentQuestionSchema = new Schema(
  {
    studentId: String,
    grade: String,
    subject: String,
    teacher: String,
    category: String,
    topic: String,
    explanation: String,
    file: String,
  },
  { timestamps: true }
);

const StudentQuestions = model("StudentQuestion", StudentQuestionSchema);
export default StudentQuestions;
