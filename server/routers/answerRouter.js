import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { allAnswers, postAnswer, totalAnswer } from "../controller/answersController.js";

const answerRouter = express.Router();

// post answer 
answerRouter.post('/post_answer', authMiddleware, postAnswer)

// get all answer for single question
answerRouter.get('/all_answer/:question_id', authMiddleware, allAnswers)

// get total answer by user
answerRouter.get("/total_answer/:user_id", authMiddleware, totalAnswer);

export default answerRouter;