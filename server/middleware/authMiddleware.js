import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Authentication invalid" });
  }

  // spilt Bearer
  const token = authHeader.split(" ")[1];
  // console.log(authHeader)
  try {
    const { first_name, last_Name, user_email, user_id } = jwt.verify(token, process.env.SECRET);
    // send data
    req.user = { first_name, last_Name, user_email, user_id };
    next();
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Authentication invalid" });
  }
}

export default authMiddleware;