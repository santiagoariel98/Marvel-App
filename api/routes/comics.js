var express = require("express");
var router = express.Router();

var comicsController = require("../controllers/comics/");

/* GET users listing. */

router.get("/", comicsController.getAllComics);

router.get("/news", comicsController.getNewsComics);

router.get("/last", comicsController.getLastComics);

router.get("/:id", comicsController.getComicById);

router.get("/:id/characters", comicsController.getCharactersComic);

router.get("/:id/creators", comicsController.getCreatorsComic);

router.get("/:id/events", comicsController.getEventsComic);

router.get("/:id/stories", comicsController.getStoriesComic);

module.exports = router;
