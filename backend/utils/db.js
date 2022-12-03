const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "marmodo",
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
});

module.exports = pool;
