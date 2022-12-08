const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const { apiRoutes } = require("./routes");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    console;
    cb(null, uuidv4());
  },
});

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
  console.log(err);
  res.status(statusCode).json({ message, data });
});

app.listen(port, () => {
  console.log(`listening server at port ${port}`);
});
