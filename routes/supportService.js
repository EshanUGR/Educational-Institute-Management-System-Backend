import { Router } from "express";
import {
  addReply,
  checkPastPapers,
  deleteReply,
  editReply,
  getPastPapers,
  getQuestionsByStudentId,
  getReply,
  getStudentQuestion,
  getStudentQuestions,
  getSupportServiceMemebers,
  postingQuestionByStudent,
  uploadPaper,
} from "../controllers/supportService.js";

const router = Router();

// student
router.get("/support-service-members", getSupportServiceMemebers);
router.post("/post-question", postingQuestionByStudent);
router.post("/upload-paper", uploadPaper);
router.get("/get-questions-by-studentId/:studentId", getQuestionsByStudentId);

// teacher
router.get("/get-student-questions/:name", getStudentQuestions);
router.get("/get-student-question/:id", getStudentQuestion);

// reply
router.post("/add-reply", addReply);
router.get("/get-reply/:questionId", getReply);
router.put("/edit-reply/:id", editReply);
router.delete("/delete-reply/:id", deleteReply);

// check past papers
router.get("/get-pastpapers", getPastPapers);
router.patch("/check-pastpapers/:paperId", checkPastPapers);

export default router;
