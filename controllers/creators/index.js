const type = "creators";

const { getInfo, getListsOfDataFromAnId } = require("../utils");

module.exports = {
  async getAllCreators(req, res) {
    const q = req.query;
    const characters = await getInfo(type, q);
    res.send(characters).status(characters.success ? 200 : 400);
  },

  async getCreatorById(req, res) {
    const { id } = req.params;
    const dataID = await getInfoById(id, type);
    res.send(dataID);
  },
  async getComicsCreator(req, res) {
    const { id } = req.params;
    let dataType = "comics";
    const q = req.query;

    const data = await getListsOfDataFromAnId(id, type, q, dataType);

    res.send(data).status(data.success ? 200 : 400);
  },
  async getEventsCreator(req, res) {
    const { id } = req.params;
    let dataType = "events";
    const q = req.query;

    const data = await getListsOfDataFromAnId(id, type, q, dataType);

    res.send(data).status(data.success ? 200 : 400);
  },
  async getSeriesCreator(req, res) {
    const { id } = req.params;
    let dataType = "series";
    const q = req.query;

    const data = await getListsOfDataFromAnId(id, type, q, dataType);

    res.send(data).status(data.success ? 200 : 400);
  },
  async getStoriesCreator(req, res) {
    const { id } = req.params;
    let dataType = "stories";
    const q = req.query;

    const data = await getListsOfDataFromAnId(id, type, q, dataType);

    res.send(data).status(data.success ? 200 : 400);
  },
};
