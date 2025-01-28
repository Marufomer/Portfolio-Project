import db from "../db/dbconfig.js";
import dotenv from "dotenv";
dotenv.config();

async function postAnswer(req, res) {
  const { user_id, question_id, answer } = req.body;
  const sql = `INSERT INTO answers (user_id, question_id,answer) VALUES (?,?,?)`;

  try {
    if (!user_id || !question_id || !answer) {
      return res.status(401).json({ msg: "Please provide all data" });
    }

    await db.query(sql, [user_id, question_id, answer], (err) => {
      if (err) throw err;
      console.log("answer added successfully");
    });
    res.status(200).json({ msg: "Data added successfully" });
  } catch (error) {
    console.log(error.message);
  }
}

async function allAnswers(req, res) {
  const question_id = req.params.question_id;
  const sql = `select * from answers join user on answers.user_id=user.user_id join questions on answers.question_id=questions.question_id where answers.question_id=?`;

  try {
    if (!question_id) {
      return res.status(401).json({ msg: "Please provide question id" });
    }

    const [data] = await db.query(sql, [question_id]);

    res.status(200).send({ answers: data });
  } catch (error) {
    console.log(error.message);
  }
}

async function totalAnswer(req, res) {
  const user_id = req.params.user_id;
  const sql = `select * from answers where user_id=?`;

  try {
    if (!user_id) {
      return res.status(401).json({ msg: "Please provide user id" });
    }

    const [data] = await db.query(sql, [user_id]);

    res.status(200).send({ total_answer: data.length });
  } catch (error) {
    console.log(error.message);
  }
};

export {postAnswer, allAnswers, totalAnswer}