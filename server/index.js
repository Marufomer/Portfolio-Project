import express from 'express';
import dotenv from "dotenv";
import userRouter from './routers/userRouter.js';
import db from './db/dbconfig.js';
import  cors from 'cors'
import { StatusCodes } from "http-status-codes";
import questionRouter from './routers/questionRoute.js';
import answerRouter from './routers/answerRouter.js';
dotenv.config();

const app = express();
const port = 4000;

app.use(cors())
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"));

// user routes m
app.use('/api/user', userRouter)

// questions routes
app.use('/api/question', questionRouter)

// answer routes
app.use('/api/answer', answerRouter);

app.get('/', async (req, res) => {
   const sql1 = `CREATE TABLE if not exists users(
        user_id int auto_increment,
        firstName varchar(255) not null,
        lastName varchar(255) not null,
        email varchar(255) not null,
        password varchar(255) not null,
        
        PRIMARY KEY (user_id)
    )`;
    const sql2 = `CREATE TABLE if not exists questions(
      id int auto_increment,
      user_id int(11) not null,
      question_id varchar(255) not null,
      title varchar(2000) not null,
      descrption varchar(2000) not null,
      tags json(1000) not null,

      PRIMARY KEY (id),
      FOREIGN KEY (user_id) REFERENCES users(user_id)
    )`;
    const sql3 = `CREATE TABLE if not exists answers(
      id int auto_increment,
      user_id int(11) not null,
      question_id varchar(255) not null,
      answer varchar(2000) not null,

      PRIMARY KEY (id),
      FOREIGN KEY (user_id) REFERENCES users(user_id),
      FOREIGN KEY (question_id) REFERENCES questions(question_id)
    )`;
    const sql4 = `CREATE TABLE if not exists images(
      id int auto_increment,
      user_id int(11) not null,
      image varchar(255) not null,

      PRIMARY KEY (id),
      FOREIGN KEY (user_id) REFERENCES users(user_id)
    )`;

    try {
      // await db.query(sql1);
      await db.query(sql2);
      await db.query(sql3);
      await db.query(sql4);

      res.status(StatusCodes.CREATED).json({ msg: "table created!" });
    } catch (error) {
      console.log(error.message);
          return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "something went wrong, try again later!" });
    }
})


async function start() {
     try {
        await db.execute("select 'test'");
        app.listen(port);
        console.log("database connection established");
        console.log(`listening on ${port}`);
     } catch (error) {
        console.log(error.message);
     }
}

start();