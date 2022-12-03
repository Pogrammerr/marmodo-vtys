const express = require("express");
const { userRoutes } = require("./users");

const router = express.Router();

router.use("/user", userRoutes);

exports.apiRoutes = router;
