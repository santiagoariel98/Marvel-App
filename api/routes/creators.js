var express = require("express");
var router = express.Router();

var creatorsController = require("../controllers/creators/");

/* GET users listing. */

router.get("/", creatorsController.getAllCreators);

router.get("/:id", creatorsController.getCreatorById);

router.get("/:id/comics", creatorsController.getComicsCreator);

router.get("/:id/events", creatorsController.getEventsCreator);

router.get("/:id/series", creatorsController.getSeriesCreator);

router.get("/:id/stories", creatorsController.getStoriesCreator);

module.exports = router;
