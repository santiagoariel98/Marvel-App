var express = require("express");
var router = express.Router();

var newsControllers = require("../controllers/news/");

/* GET users listing. */

// get comics
// router.get("/", comicsController.getCharacters);

// get all Comics
router.get("/comics", newsControllers.getNewsComics);

router.get("/comics/release", newsControllers.getNextReleases);

router.get("/characters/", newsControllers.getCharacters);

module.exports = router;
