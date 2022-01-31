var express = require("express");
var router = express.Router();

var charactersController = require("../controllers/series/");

/* GET users listing. */

router.get("/", charactersController.getAllSeries);

router.get("/:id", charactersController.getSerieById);

router.get("/:id/comics", charactersController.getComicsSerie);

router.get("/:id/events", charactersController.getEventsSerie);

router.get("/:id/characters", charactersController.getCharactersSerie);

router.get("/:id/creators", charactersController.getCreatorsSerie);

router.get("/:id/stories", charactersController.getStoriesSerie);
module.exports = router;
