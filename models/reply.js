import { model, Schema } from "mongoose";

const replySchema = new Schema(
  {
    questionId: String,
    message: String,
  },
  { timestamps: true }
);

const Reply = model("Reply", replySchema);
export default Reply;
