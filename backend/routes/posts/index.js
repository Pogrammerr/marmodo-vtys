const express = require("express");
const { addPost } = require("../../controllers/posts");
const { isAuth } = require("../../middleware/is-auth");

const router = express.Router();

router.use("/addPost", isAuth, addPost);
// router.get("/:postId", getPost);

exports.postRoutes = router;
