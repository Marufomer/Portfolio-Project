import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();
console.log(process.env.USER);

const db = mysql.createPool({
  user: process.env.USER,
  database: process.env.DATABASE,
  host: "localhost",
  password: process.env.PASSWORD,
  connectionLimit: 10,
});

export default db.promise();

