const pool = require("../utils/db");

exports.getPost = (req, res) => {
  const { postId } = req.body;
};

exports.addPost = async (req, res) => {
  const {
    userId,
    classId,
    details,
    homeworkDetails,
    homeworkFile,
    homeworkDeadline,
    homeworkName,
  } = req.body;

  const now = new Date().toISOString();

  if (homeworkName) {
    /*     const hwresult = await pool.query(
      `INSERT INTO posts (name, deadline, "filePath", details)
      VALUES ($1, $2, $3, $4)`,
      [homeworkName, homeworkDeadline, homeworkFile, homeworkDetails]
    ); */
  }

  /*   const result = await pool.query(
    `INSERT INTO homeworks ("authorId", details, "createdAt", "homeworkId")
    VALUES ($1, $2, $3, $4)`,
    [userId, postDetails, now]
  ); */

  res.status(200).json({ res: "success!" });
};
