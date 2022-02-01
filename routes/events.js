var express = require("express");
var router = express.Router();

var eventsController = require("../controllers/events/");

/* GET users listing. */

// get comics
// router.get("/", comicsController.getCharacters);

// get all events
router.get("/", eventsController.getAllEvents);

// get all events
router.get("/news", eventsController.getNewsEvents);

//  get characters event
router.get("/:id/characters", eventsController.getCharactersEvent);

// get comics event
router.get("/:id/comics", eventsController.getComicsEvent);

// get creators event
router.get("/:id/creators", eventsController.getCreatorsEvent);

// get events event
router.get("/:id/series", eventsController.getSeriesEvent);

// get stories event
router.get("/:id/stories", eventsController.getStoriesEvent);

module.exports = router;
