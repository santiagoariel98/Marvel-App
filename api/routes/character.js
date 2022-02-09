var express = require("express");
var router = express.Router();

var charactersController = require("../controllers/characters/");

/* GET users listing. */

router.get("/", charactersController.getCharacters);

router.get("/news", charactersController.getNewsCharacters);

router.get("/:id", charactersController.getCharacterById);

router.get("/:id/comics", charactersController.getComicsCharacter);

router.get("/:id/events", charactersController.getEventsCharacter);

router.get("/:id/series", charactersController.getSeriesCharacter);

router.get("/:id/stories", charactersController.getStoriesCharacter);

module.exports = router;
