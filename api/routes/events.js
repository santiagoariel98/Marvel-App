var express = require("express");
var router = express.Router();

var eventsController = require("../controllers/events/");

/* GET users listing. */

router.get("/", eventsController.getAllEvents);

router.get("/news", eventsController.getNewsEvents);

router.get("/:id", eventsController.getEventById);

router.get("/:id/characters", eventsController.getCharactersEvent);

router.get("/:id/comics", eventsController.getComicsEvent);

router.get("/:id/creators", eventsController.getCreatorsEvent);

router.get("/:id/series", eventsController.getSeriesEvent);

router.get("/:id/stories", eventsController.getStoriesEvent);

module.exports = router;
