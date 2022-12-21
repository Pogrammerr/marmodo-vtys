const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const { apiRoutes } = require("./routes");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Setting multer to recognize images.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("sadas", file);
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, path.join("public", "images"));
    } else {
      cb(null, path.join("public", "homeworks"));
    }
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + "-" + file.originalname);
  },
});

// Setting multer filter to filter image file formats.
const fileFilter = (req, file, cb) => {
  console.log(file);
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(multer({ storage }).single("homeworkFile"));
app.use(express.static(path.join(__dirname, "public")));

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
