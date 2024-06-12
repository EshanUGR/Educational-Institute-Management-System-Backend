import User from "../models/user.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import StudentQuestions from "../models/studentQuestions.js";
import PastPaper from "../models/pastPaper.js";
import Reply from "../models/reply.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

// student
export const getSupportServiceMemebers = async (req, res, next) => {
  try {
    const supportServiceMembers = await User.find({
      role: "Help Desk Supporter",
    });

    const names = supportServiceMembers.map(
      (member) => member.firstName + " " + member.lastName
    );

    res.status(200).json(names);
  } catch (error) {
    next(error);
  }
};

export const postingQuestionByStudent = async (req, res, next) => {
  try {
    const body = req.body;
    const { file } = req.files;

    let fileName = file.name;
    let splittedFilename = fileName.split(".");
    let newFilename =
      splittedFilename[0] +
      "_" +
      Date.now() +
      "." +
      splittedFilename[splittedFilename.length - 1];

    file.mv(
      path.join(__dirname, "..", "/uploads/proofDocs", newFilename),
      async (err) => {
        if (err) {
          return next(next(err));
        } else {
          const newInventory = await StudentQuestions.create({
            ...body,
            file: newFilename,
          });
          res.status(201).json(newInventory);
        }
      }
    );
  } catch (error) {
    next(error);
  }
};

const findReply = (replies, questionId) => {
  return replies.find((reply) => reply.questionId === questionId.toString());
};

export const getQuestionsByStudentId = async (req, res, next) => {
  try {
    const { studentId } = req.params;

    const questions = await StudentQuestions.find({ studentId: studentId });
    const replies = await Reply.find();

    const result = [];

    questions.forEach((question) => {
      const reply = findReply(replies, question._id);
      if (reply) {
        result.push({ question, reply });
      } else {
        result.push({ question });
      }
    });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const uploadPaper = async (req, res, next) => {
  try {
    const body = req.body;
    const { file } = req.files;

    let fileName = file.name;
    let splittedFilename = fileName.split(".");
    let newFilename =
      splittedFilename[0] +
      "_" +
      Date.now() +
      "." +
      splittedFilename[splittedFilename.length - 1];

    file.mv(
      path.join(__dirname, "..", "/uploads/papers", newFilename),
      async (err) => {
        if (err) {
          return next(next(err));
        } else {
          const pastPaper = await PastPaper.create({
            ...body,
            paper: newFilename,
          });
          res.status(201).json(pastPaper);
        }
      }
    );
  } catch (error) {
    next(error);
  }
};

// support staff member
export const getStudentQuestions = async (req, res, next) => {
  try {
    const { name } = req.params;

    const studentQuestions = await StudentQuestions.find({ teacher: name });

    res.status(200).json(studentQuestions);
  } catch (error) {
    next(error);
  }
};

export const getStudentQuestion = async (req, res, next) => {
  try {
    const { id } = req.params;

    const studentQuestion = await StudentQuestions.findById(id);

    res.status(200).json(studentQuestion);
  } catch (error) {
    next(error);
  }
};

// support staff member reply
export const getReply = async (req, res, next) => {
  try {
    const { questionId } = req.params;

    const reply = await Reply.findOne({ questionId });

    res.status(200).json(reply);
  } catch (error) {
    next(error);
  }
};

export const addReply = async (req, res, next) => {
  try {
    const reply = await Reply.create(req.body);

    res.status(200).json(reply);
  } catch (error) {
    next(error);
  }
};

export const editReply = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedReply = await Reply.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json(updatedReply);
  } catch (error) {
    next(error);
  }
};

export const deleteReply = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedReply = await Reply.findByIdAndDelete(id);

    if (deletedReply) {
      res.status(201).json({ message: "Reply deleted successfully!" });
    }
  } catch (error) {
    next(error);
  }
};

// get past papers
export const getPastPapers = async (req, res, next) => {
  try {
    const pastpapers = await PastPaper.find();
    const students = await User.find({ role: "Student" });

    const paperWithStudent = [];

    pastpapers.forEach((paper) => {
      const student = students.find(
        (student) => student._id.toString() === paper.userId
      );

      if (student) {
        paperWithStudent.push({ paper, student });
      }
    });

    return res.status(200).json(paperWithStudent);
  } catch (error) {
    next(error);
  }
};

// check past papers
export const checkPastPapers = async (req, res, next) => {
  try {
    const { paperId } = req.params;
    const body = req.body;

    const marksUpdatedPaper = await PastPaper.findByIdAndUpdate(
      paperId,
      { checkedBy: body.checkedBy, result: body.marks },
      { new: true }
    );

    if (marksUpdatedPaper) {
      res.status(201).json({ message: "Marks uploaded" });
    }
  } catch (error) {
    next(error);
  }
};
