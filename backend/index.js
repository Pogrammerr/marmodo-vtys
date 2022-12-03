const express = require("express");
const bodyParser = require("body-parser");
const { apiRoutes } = require("./routes");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", apiRoutes);

app.listen(port, () => {
  console.log(`listening server at port ${port}`);
});
