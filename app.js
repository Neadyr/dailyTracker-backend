require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("./models/connexion");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const fileUpload = require("express-fileupload");
const cors = require("cors");

var app = express();

app.use(fileUpload());
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
