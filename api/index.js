const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


const downloadRouter = require("./downloadXSD/routes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/", downloadRouter);

module.exports = app;
