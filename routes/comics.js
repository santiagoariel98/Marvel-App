var express = require("express");
var router = express.Router();

var comicsController = require("../controllers/comics/");

/* GET users listing. */

// get comics
// router.get("/", comicsController.getCharacters);

// get all Comics
router.get("/", comicsController.getAllComics);

// get new Comics
router.get("/news", comicsController.getNewComics);

// get comic by id (all info)
router.get("/:id", comicsController.getComicById);

//  get characters comic
router.get("/:id/characters", comicsController.getCharactersComic);

// get creators comics
router.get("/:id/creators", comicsController.getCreatorsComic);

// get events comics
router.get("/:id/events", comicsController.getEventsComic);

// get stories comics
router.get("/:id/stories", comicsController.getStoriesComic);

module.exports = router;
