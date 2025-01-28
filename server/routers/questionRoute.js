import express from "express";
import db from "../db/dbconfig.js";
import { v4 as uuidv4 } from "uuid";
import authMiddleware from "../middleware/authMiddleware.js";
import { allQuestions, postQuestion, singleQuestion, totalQuestions } from "../controller/questionsController.js";


const questionRouter = express.Router();

// post question
questionRouter.post('/post_question', authMiddleware, postQuestion)

// get all questions
questionRouter.get('/all_questions',authMiddleware, allQuestions)

// get single question
questionRouter.get('/single_question/:question_id',authMiddleware, singleQuestion)

// get total question
questionRouter.get('/total_question/:user_id',authMiddleware, totalQuestions)
export default questionRouter;