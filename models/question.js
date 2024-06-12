import { model, Schema } from "mongoose";

const questionSchema = new Schema({
  question: { type: String, required: true },
  answers: { type: [String], required: true },
  correctAnswer: { type: String, required: true },
});

const Question = model("question", questionSchema);
export default Question;
