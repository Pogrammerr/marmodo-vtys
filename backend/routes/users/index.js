const express = require("express");
const { getUserData, createUser } = require("../../controllers/users");

const router = express.Router();

router.use("/getUserData", getUserData);
router.use("/createUser", createUser);

exports.userRoutes = router;
