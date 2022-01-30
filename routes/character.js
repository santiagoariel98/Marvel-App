var express = require("express");
var router = express.Router();

var charactersController = require("../controllers/characters/");

/* GET users listing. */

// get characters
router.get("/", charactersController.getCharacters);

// get new characters
router.get("/news", charactersController.getNewCharacters);

// get character id
router.get("/:id", charactersController.getCharacterById);

// get character comics
router.get("/:id/comics", charactersController.getComicsCharacter);

// get character events
router.get("/:id/events", charactersController.getEventsCharacter);

// get character series
router.get("/:id/series", charactersController.getSeriesCharacter);
// get character stories
router.get("/:id/stories", charactersController.getStoriesCharacter);

module.exports = router;
