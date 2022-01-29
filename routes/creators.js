var express = require("express");
var router = express.Router();

var creatorsController = require("../controllers/creators/");

/* GET users listing. */

// get comics
// router.get("/", comicsController.getCharacters);

// get all Comics
router.get("/", creatorsController.getAllCreators);

// get new Comics
router.get("/news", creatorsController.getNewCreators);

// get comic by id (all info)
router.get("/:id", creatorsController.getCreatorById);

//  get characters comic
router.get("/:id/comics", creatorsController.getComicsCreator);

// get creators comics
router.get("/:id/events", creatorsController.getEventsCreator);

// get events comics
router.get("/:id/series", creatorsController.getSeriesCreator);

// get stories comics
router.get("/:id/stories", creatorsController.getStoriesCreator);

module.exports = router;
