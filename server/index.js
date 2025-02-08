import express from 'express';
import dotenv from "dotenv";
import userRouter from './routers/userRouter.js';
import db from './db/dbconfig.js';
import  cors from 'cors'
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