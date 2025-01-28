import db from "../db/dbconfig.js";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

async function register(req, res) {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please provide all required information" });
  }

  try {
    const [user] = await db.query(
      "select email,user_id from user where email = ?",
      [email]
    );

    if (user.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "User already registered" });
    }

    if (password.length < 8) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Password must be at least 8 character" });
    }

    // encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await db.query(
      "INSERT INTO user (firstName, lastName, email, password) VALUES (?,?,?,?)",
      [firstName, lastName, email, hashedPassword]
    );

    //   sign token
    const [new_user] = await db.query(
      "select email, user_id, firstName from user where email = ?",
      [email]
    );

    const user_email = new_user[0].email;
    const user_id = new_user[0].user_id;
    const first_Name = new_user[0].firstName
    const token = jwt.sign({ user_email, user_id }, process.env.SECRET, {
      expiresIn: "120d",
    });

    return res.status(StatusCodes.CREATED).json({
      message: "User registered successful",
      token,
      user_id,
      first_Name,
      email,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "something went wrong, try again later!" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please provide all required information" });
  }

  try {
    const [user] = await db.query(
      "select email,password,user_id from user where email = ?",
      [email]
    );

    if (user.length === 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Either the email or password your entered is incorrect",
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user[0].password);

    if (!isMatch) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message:
          "Either the registeration number or password your entered is incorrect",
      });
    }

    //   sign token
    const [new_user] = await db.query(
      "select firstName, user_id, firstName from user where email = ?",
      [email]
    );

    const user_email = new_user[0].email;
    const user_id = new_user[0].user_id;
    const first_name = new_user[0].firstName;
    const token = jwt.sign(
      { user_email, first_name, user_id },
      process.env.SECRET,
      {
        expiresIn: "120d",
      }
    );

    return res.status(StatusCodes.CREATED).json({
      message: "User login successfully",
      token,
      user_email,
      first_name,
      user_id,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "something went wrong, try again later!" });
  }
}

async function checkUser(req, res) {
  const { first_name, user_id } = req.user;
  res
    .status(StatusCodes.OK)
    .json({ message: "User valid", first_name, user_id });
}
;
async function profilePost(req, res) {
  const image = req.file.filename;
  const user_id = req.body.user_id;
  const sql = "insert into images (image, user_id) values (?,?)";
  const sqlCheck = "select * from images where user_id=?";

  try {
    const [data] = await db.query(sqlCheck, [user_id]);

    if (data[0]) {
      console.log(data);
      await db.query("update images set image=? where userId=?", [
        image,
        user_id,
      ]);
    } else {
      await db.query(sql, [image, user_id]);
    }
    // await db.query(sql, [image,userId])
    res.status(StatusCodes.CREATED).json({ msg: "image inserted!" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "something went wrong, try again later!" });
  }
}
async function profileGet(req, res) {
  const sql = "select * from images where user_id=?";
  const user_id = req.params.id;

  try {
    const [data] = await db.query(sql, [user_id]);
    res.status(StatusCodes.ACCEPTED).json(data[0]);
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "something went wrong, try again later!" });
  }
}

export {register, login, checkUser, profilePost, profileGet};