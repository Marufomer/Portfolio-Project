import express from 'express';

const app = express();
const port = 4000;

app.get('/', (req, res) => {
    res.send('hello')
})

app.get('/test', (req, res) => {
    res.send("test hani")
})
app.listen(port, () => {
    console.log("listening")
});