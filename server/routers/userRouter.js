import express from 'express';

const router = express.Router();

// register router
router.post('/register', (req, res) => {
    res.send('register user')
})
// login router
router.post('/login', (req, res) => {
    res.send('login user')
})
export default router;