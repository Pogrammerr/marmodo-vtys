const express = require("express");
const { getUserData, createUser, login } = require("../../controllers/users");

const router = express.Router();

router.use("/createPost", createPost);
router.get("/:postId", getPost);

exports.userRoutes = router;
