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
    const results = await pool.query(
      `INSERT INTO users ("firstName", "lastName", email, password) 
      VALUES ($1, $2, $3, $4)`,
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
      `SELECT * FROM "users_classes" 
      WHERE "userId"=$1`,
      [id]
    );

    const userClassAmountResult = await pool.query(
      `SELECT COUNT(*) FROM users_classes
      WHERE "userId"=$1
      `,
      [id]
    );

    const userClassAmount = userClassAmountResult.rows[0].count;

    const userClasses = await Promise.all(
      userClassesResult.rows.map(async (row) => {
        const classResult = await pool.query(
          `SELECT "id", "name", "creatorId", "code" FROM classes
          GROUP BY "id"
          HAVING "id"=$1`,
          [row.classId]
        );

        const posts = await Promise.all(
          classResult.rows.map(async (classData) => {
            const postResult = await pool.query(
              `SELECT * FROM posts as po
              JOIN classes_posts as cp ON po.id = cp."postId"
              WHERE cp."classId" = $1`,
              [classData.id]
            );

            const homeworks = await Promise.all(
              postResult.rows.map(async (postData) => {
                if (postData.homeworkId) {
                  const homeworkResult = await pool.query(
                    `SELECT * FROM homeworks as hw
                    WHERE id=$1`,
                    [postData.homeworkId]
                  );
                  return homeworkResult.rows[0];
                }
              })
            );

            const authors = await Promise.all(
              postResult.rows.map(async (postData) => {
                const authorResult = await pool.query(
                  `SELECT * FROM users
                  WHERE users.id = $1`,
                  [postData.authorId]
                );

                return authorResult.rows[0];
              })
            );

            const postObject = postResult.rows.map((res) => {
              return {
                id: res.id,
                details: res.details,
                createdAt: res.createdAt,
                homework: homeworks
                  .filter((hw) => hw)
                  .find((hw) => hw.id === res.homeworkId),
                author: authors
                  .filter((author) => author)
                  .find((author) => author.id === res.authorId),
              };
            });

            return postObject;
          })
        );

        const classUserAmount = await pool.query(
          `SELECT COUNT(*) FROM users_classes
          WHERE "classId"=$1`,
          [row.classId]
        );

        return {
          ...classResult.rows[0],
          posts: posts[0],
          userAmount: classUserAmount.rows?.[0]?.count,
        };
      })
    );

    // console.log(userClasses);

    const userObj = {
      ...user.rows[0],
      classes: userClasses,
      classAmount: userClassAmount,
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
        id: user.rows[0].id,
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
