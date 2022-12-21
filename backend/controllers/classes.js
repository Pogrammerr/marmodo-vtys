const pool = require("../utils/db");
const crypto = require("crypto");

exports.createClass = async (req, res) => {
  const { className } = req.body;
  const classCode = crypto.randomBytes(3).toString("hex");
  console.log(req.userId);

  const query1 = await pool.query(
    `INSERT INTO classes (name, "creatorId", code)
    VALUES ($1, $2, $3)
    RETURNING id`,
    [className, req.userId, classCode]
  );

  const insertedClassId = query1.rows[0].id;

  const query2 = await pool.query(
    `INSERT INTO users_classes ("userId", "classId")
    VALUES ($1, $2)`,
    [req.userId, insertedClassId]
  );

  res.json({ code: classCode });
};

exports.joinClass = async (req, res) => {
  const { classCode } = req.body;

  const query1 = await pool.query(
    `SELECT id FROM classes
    WHERE code=$1`,
    [classCode]
  );

  const classId = query1.rows[0].id;

  const query2 = await pool.query(
    `INSERT INTO users_classes ("userId", "classId")
    VALUES ($1, $2)`,
    [req.userId, classId]
  );

  res.status(200).json({ data: "success" });
};
