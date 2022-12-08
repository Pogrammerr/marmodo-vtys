const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const { apiRoutes } = require("./routes");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Setting multer to recognize images.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    console;
    cb(null, uuidv4());
  },
});

// Setting multer filter to filter image file formats.
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(multer({ storage, fileFilter }).single("image"));

// Accepting requests from different origins
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/api", apiRoutes);

app.use((err, req, res, next) => {
  const { statusCode, message, data } = err;
  res.status(statusCode).json({ message, data });
});

app.listen(port, () => {
  console.log(`listening server at port ${port}`);
});
