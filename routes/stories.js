var express = require("express");
var router = express.Router();

var storiesController = require("../controllers/stories/");

/* GET users listing. */

router.get("/", storiesController.getAllStories);

router.get("/news", storiesController.getNewStories);

router.get("/:id", storiesController.getStorieById);

router.get("/:id/comics", storiesController.getComicsStorie);

router.get("/:id/events", storiesController.getEventsStorie);

router.get("/:id/characters", storiesController.getCharactersStorie);

router.get("/:id/creators", storiesController.getCreatorsStorie);

router.get("/:id/series", storiesController.getSeriesStorie);

module.exports = router;
