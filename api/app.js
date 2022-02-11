require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

// routes
var characterRouter = require("./routes/character");
var comicsRouter = require("./routes/comics");
var creatorsRouter = require("./routes/creators");
var eventsRouter = require("./routes/events");
var seriesRouter = require("./routes/series");
var storiesRouter = require("./routes/stories");
var app = express();

// middleware
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// routes
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
  res
    .status(err.status || 500)
    .send({ error: `path ${req.path} not found`, success: false });
});

module.exports = app;
