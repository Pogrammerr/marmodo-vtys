const pool = require("../utils/db");

exports.getPost = (req, res) => {
  const { postId } = req.body;
};

exports.addPost = async (req, res) => {
  const {
    userId,
    classId,
    details,
    time,
    homeworkDetails,
    homeworkDeadline,
    homeworkName,
  } = req.body;

  /*   if (!file) {
    const error = new Error("Eklenen dosya desteklenmeyen bir formatta.");
    error.statusCode = 404;
    throw error;
  } */

  let hwId = null;
  if (homeworkName) {
    const filePath = req.file?.path?.slice(7, undefined);
    const hwresult = await pool.query(
      `INSERT INTO homeworks (name, deadline, "filePath", details)
      VALUES ($1, $2, $3, $4)
      RETURNING "id"`,
      [homeworkName, homeworkDeadline, filePath, homeworkDetails]
    );
    hwId = hwresult.rows[0].id;
  }

  const postResult = await pool.query(
    `INSERT INTO posts ("authorId", details, "createdAt", "homeworkId")
    VALUES ($1, $2, $3, $4)
    RETURNING id`,
    [userId, details, time, hwId]
  );

  const insertedPostId = postResult.rows[0].id;

  pool.query(
    `INSERT INTO classes_posts ("classId", "postId")
    VALUES ($1, $2)`,
    [classId, insertedPostId]
  );

  res.status(200).json({ res: "success!" });
};

exports.uploadHomework = (req, res) => {
  const { homeworkId } = req.body;

  if (!req.file) {
    const error = new Error("Dosya eklenmedi.");
    error.statusCode = 404;
    throw error;
  }

  const filePath = req.file?.path?.slice(7, undefined);

  const query1 = pool.query(
    `
  INSERT INTO users_completedhomeworks ("userId", "homeworkId", "filePath")
  VALUES ($1, $2, $3)`,
    [req.userId, homeworkId, filePath]
  );

  res.status(200).json({ data: "success" });
};
