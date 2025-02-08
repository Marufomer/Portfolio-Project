import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const urlDb = `msql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQLDATABASE}`;

const db = mysql.createPool(urlDb);

export default db.promise();

