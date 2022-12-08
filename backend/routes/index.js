const express = require("express");
const { userRoutes } = require("./users");
const { postRoutes } = require("./posts");
const { classRoutes } = require("./classes");

const router = express.Router();

router.use("/user", userRoutes);
// router.use("/posts", postRoutes);
// router.use("/classes", classRoutes);

exports.apiRoutes = router;
