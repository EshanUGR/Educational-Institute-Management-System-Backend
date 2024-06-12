import ExamNotice from "../models/examNotice.js";
import Question from "../models/question.js";
import ExamFeedback from "../models/examFeedback.js";

const getRandomItems = (arr, numItems) => {
  const result = [];
  const shuffled = arr.sort(() => Math.random() - 0.5);

  for (let i = 0; i < numItems && i < shuffled.length; i++) {
    result.push(shuffled[i]);
  }
  return result;
};

export const getAllQuestions = async (req, res, next) => {
  try {
    const allQuestions = await Question.find();
    res.status(200).json(allQuestions);
  } catch (error) {
    next(error);
  }
};

export const postQuestion = async (req, res, next) => {
  try {
    const body = req.body;
    const newQuestion = await Question.create(body);

    if (newQuestion) {
      res.status(201).json(newQuestion);
    }
  } catch (error) {
    next(error);
  }
};

export const deleteQuestion = async (req, res, next) => {
  try {
    const { questionId } = req.params;
    const removedQuestion = await Question.findByIdAndDelete(questionId);

    if (removedQuestion) {
      res.status(201).json(removedQuestion);
    }
  } catch (error) {
    next(error);
  }
};

export const editQuestion = async (req, res, next) => {
  try {
    const { questionId } = req.params;
    const body = req.body;

    const updatedQuestion = await Question.findByIdAndUpdate(questionId, body, {
      new: true,
    });

    if (updatedQuestion) {
      res.status(201).json(updatedQuestion);
    }
  } catch (error) {
    next(error);
  }
};

export const generateQuiz = async (req, res, next) => {
  try {
    const allQuestions = await Question.find();
    const randomQuestions = getRandomItems(allQuestions, 10);
    res.status(200).json(randomQuestions);
  } catch (error) {
    next(error);
  }
};

export const getAllExamNotices = async (req, res) => {
  try {
    const data = await ExamNotice.find({});
    res.json({ success: true, data: data });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getAllFeedback = async (req, res) => {
  try {
    const data = await ExamFeedback.find({});
    res.json({ success: true, data: data });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const publishExamNotice = async (req, res) => {
  const data = new ExamNotice(req.body);
  await data.save();
  res.send({ success: true, message: "data save succesfully", data: data });
};

export const publishExamFeedback = async (req, res) => {
  const data = new ExamFeedback(req.body);
  await data.save();
  res.send({ success: true, message: "data save succesfully", data: data });
};

export const updateExamNotice = async (req, res) => {
  const { _id, ...rest } = req.body;

  try {
    const data = await ExamNotice.updateOne({ _id: _id }, rest);
    res.send({
      success: true,
      message: "Notice update successfully",
      data: data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const updateExamFeedback = async (req, res) => {
  const { _id, ...rest } = req.body;

  try {
    const data = await ExamFeedback.updateOne({ _id: _id }, rest);
    res.send({
      success: true,
      message: "Feedback update successfully",
      data: data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const deleteExamNotice = async (req, res) => {
  try {
    const noticeId = req.params.id;

    // Use mongoose to find and delete the user by ID
    const deletedNotice = await ExamNotice.findByIdAndDelete(noticeId);

    if (deletedNotice) {
      res.json({
        success: true,
        message: "Notice deleted successfully",
        data: deletedNotice,
      });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Notice not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const deleteExamFeedback = async (req, res) => {
  try {
    const feedId = req.params.id;

    // Use mongoose to find and delete the user by ID
    const deletedFeedback = await ExamFeedback.findByIdAndDelete(feedId);

    if (deletedFeedback) {
      res.json({
        success: true,
        message: "Feedback deleted successfully",
        data: deletedFeedback,
      });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Feedback not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
