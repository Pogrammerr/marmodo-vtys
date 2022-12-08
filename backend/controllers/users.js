const pool = require("../utils/db");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { handleError } = require("../utils/errors");

exports.createUser = async (req, res, next) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  console.log("creating user");
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed!");
    error.stausCode = 422;
    error.data = errors.array();
    throw error;
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log(hashedPassword);
    const results = await pool.query("SELECT * FROM users");
    res.status(200).json(results.rows);
  } catch (e) {
    console.log("An error occured while creating a new user: ", e);
  }
};

exports.getUserData = (req, res) => {
  console.log("gotem");
  res.send("Hello world 2!");
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);

    if (!user) {
      const error = new Error(
        "Girilen Email ile kayıtlı kullanıcı bulunamadı."
      );
      error.statusCode = 401;
      throw error;
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      const error = new Error("Wrong Password!");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (e) {
    handleError(e, next);
  }
};
