require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
// routes
var characterRouter = require("./routes/character");
var comicsRouter = require("./routes/comics");
var creatorsRouter = require("./routes/creators");
var eventsRouter = require("./routes/events");
var seriesRouter = require("./routes/series");
var storiesRouter = require("./routes/stories");

var app = express();
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/characters", characterRouter);
app.use("/api/comics", comicsRouter);
app.use("/api/creators", creatorsRouter);
app.use("/api/events", eventsRouter);
app.use("/api/series", seriesRouter);
app.use("/api/stories", storiesRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
