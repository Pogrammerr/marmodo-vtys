const express = require("express");
const { addPost, uploadHomework } = require("../../controllers/posts");
const { isAuth } = require("../../middleware/is-auth");

const router = express.Router();

router.use("/addPost", isAuth, addPost);
router.use("/uploadHomework", isAuth, uploadHomework);
// router.get("/:postId", getPost);

exports.postRoutes = router;
