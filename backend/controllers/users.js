const pool = require("../utils/db");
const bcrypt = require("bcryptjs");

exports.createUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("jkdsna");
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log(hashedPassword);
    const results = await pool.query("SELECT * FROM students");
    res.status(200).json(results.rows);
  } catch (e) {
    console.log("An error occured while creating a new user: ", e);
  }
};

exports.getUserData = (req, res) => {
  console.log("gotem");
  res.send("Hello world 2!");
};
