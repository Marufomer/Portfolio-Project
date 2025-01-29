import express from "express";
import db from "../db/dbconfig.js";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import multer from "multer";
import authMiddleware from "../middleware/authMiddleware.js";
import { checkUser, login, profileGet, profilePost, register, updatePassword } from "../controller/userController.js";

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/profile/"); // Folder where images are stored temporarily
  },
  filename: (req, file, cb) => {
    const user_id = req.params.id;
    cb(null, user_id +"-" + "user.png");
  },
});

const upload = multer({ storage });


// register router
router.post("/register", register);

// login router
router.post("/login", login);

// check user
router.get('/check', authMiddleware, checkUser)
export default router;

// update password
router.patch('/updatePassword', authMiddleware, updatePassword)

// post profile
router.post("/profile/:id", authMiddleware, upload.single('image'), profilePost)

// get image

router.get('/getProfile/:user_id', authMiddleware, profileGet)
