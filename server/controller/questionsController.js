import db from "../db/dbconfig.js";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
dotenv.config();

async function postQuestion(req, res) {
  const { title, descrption, tags } = req.body;
  const sql = `INSERT INTO questions (user_id, question_id,title, descrption,tags) VALUES (?,?,?,?,?)`;

  try {
    if (!title || !descrption || !tags) {
      return res.status(401).json({ msg: "Please provide all data" });
    }

    const tag_format = tags.trim();
    const pattern = /^(\w+)( \w+)*$/;

    if (!pattern.test(tag_format)) {
      return res.status(401).json({
        message:
          "Invalid format. Provide tags separated by spaces like: 'react bootstrap java'",
      });
    }

    const array_tags = JSON.stringify(tag_format.split(" "));
    const uuid = uuidv4();
    await db.query(sql, [1, uuid, title, descrption, array_tags], (err) => {
      if (err) throw err;
      console.log("question added successfully");
    });
    res.status(200).json({ msg: "Data added successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ msg: "data not send to mysql" });
  }
}

async function allQuestions(req, res) {
  const sql = `select * from questions join user on questions.user_id=user.user_id`;
  try {
    const [data] = await db.query(sql);

    res.status(200).send({ questions: data });
  } catch (error) {
    console.log(error.message);
  }
}

async function singleQuestion(req, res) {
  const question_id = req.params.question_id;

  const sql = `select * from questions join user on questions.user_id=user.user_id where questions.question_id=?`;

  try {
    if(!question_id) {
        return res.status(401).json({ msg: "Please provide question id" });
    }
    const [data] = await db.query(sql, [question_id]);

    res.status(200).send({ questions: data });
  } catch (error) {
    console.log(error.message);
  }
}

async function totalQuestions(req, res) {
  const user_id = req.params.user_id;

  const sql = `select * from questions join user on questions.user_id=user.user_id where questions.user_id=?`;

  try {
    if (!user_id) {
      return res.status(401).json({ msg: "Please provide user id" });
    }
    const [question] = await db.query(sql, [user_id]);
    const total_question = question.length;

    res.status(200).send({ total_question: total_question });
  } catch (error) {
    console.log(error.message);
  }
};

export {postQuestion, allQuestions, singleQuestion, totalQuestions}