const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: "127.0.0.1",
  // MySQL username,
  user: process.env.DB_USER,
  // TODO: Add MySQL password here
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = db;
