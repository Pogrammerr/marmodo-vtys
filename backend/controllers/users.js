const pool = require("../utils/db");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { handleError } = require("../utils/errors");

exports.createUser = async (req, res, next) => {
  const { name, surname, email, password } = req.body;
  const errors = validationResult(req);
  console.log("creating user");
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed!");
    error.statusCode = 422;
    error.data = errors.array();
    return next(error);
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log("hashedPassword: ", hashedPassword);
    const results = await pool.query(
      'INSERT INTO users ("firstName", "lastName", email, password) VALUES ($1, $2, $3, $4)',
      [name, surname, email, hashedPassword]
    );
    res.status(200).json(results.rows);
  } catch (e) {
    console.log("An error occured while creating a new user: ", e);
  }
};

exports.getUserData = async (req, res, next) => {
  const { id } = req.body;
  try {
    const user = await pool.query("SELECT * FROM users WHERE id=$1", [id]);

    if (user.rows.length === 0) {
      const error = new Error(
        "Girilen Email ile kayıtlı kullanıcı bulunamadı."
      );
      error.statusCode = 401;
      throw error;
    }

    const userClassesResult = await pool.query(
      'SELECT * FROM "usersClasses" WHERE "userId"=$1',
      [id]
    );

    const userClasses = await Promise.all(
      userClassesResult.rows.map(async (row) => {
        const classResult = await pool.query(
          "SELECT * FROM classes WHERE id=$1",
          [row.classId]
        );
        return classResult.rows[0];
      })
    );

    console.log(userClasses);

    const userObj = {
      ...user.rows[0],
      classes: userClasses,
    };

    res.status(200).json(userObj);
  } catch (e) {
    handleError(e, next);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);

    if (user.rows.length === 0) {
      const error = new Error(
        "Girilen Email ile kayıtlı kullanıcı bulunamadı."
      );
      error.statusCode = 401;
      throw error;
    }

    const passwordsMatch = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    if (!passwordsMatch) {
      const error = new Error("Wrong Password!");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        email: user.rows[0].email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res
      .status(200)
      .json({ token, id: user.rows[0].id, email: user.rows[0].email });
  } catch (e) {
    handleError(e, next);
  }
};
