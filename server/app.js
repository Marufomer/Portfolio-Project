import express from 'express';
import userRouter from './routers/userRouter.js';

const app = express();
const port = 4000;

app.use(express.urlencoded({extended:true}));
app.use(express.json());

// user routes m
app.use('/api/user', userRouter)

app.get('/', (req, res) => {
    res.send('hello')
})

app.get('/test', (req, res) => {
    res.send("test hani")
})
app.listen(port, () => {
    console.log(`listening ${port}`)
});