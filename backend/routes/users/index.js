const express = require("express");
const { body } = require("express-validator");
const { getUserData, createUser, login } = require("../../controllers/users");

const router = express.Router();

router.use("/getUserData", getUserData);
router.use(
  "/createUser",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        // Find the user on the database, if exists then reject the promise with Promise.reject().
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 8 }),
  ],
  createUser
);

router.use("/login", login);

exports.userRoutes = router;
