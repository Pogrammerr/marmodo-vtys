const express = require("express");
const { createClass, joinClass } = require("../../controllers/classes");
const { isAuth } = require("../../middleware/is-auth");

const router = express.Router();

router.use("/createClass", isAuth, createClass);
router.use("/joinClass", isAuth, joinClass);

exports.classRoutes = router;
