const type = "series";

const { getListsOfDataFromAnId, getInfo } = require("../utils");

module.exports = {
  async getAllSeries(req, res) {
    const q = req.query;
    const characters = await getInfo(type, q);
    res.send(characters).status(characters.success ? 200 : 400);
  },

  async getSerieById(req, res) {
    const { id } = req.params;
    const dataID = await getInfoById(id, type);
    res.send(dataID).status(dataID.success ? 200 : 400);
  },
  async getComicsSerie(req, res) {
    const { id } = req.params;
    let dataType = "comics";
    const q = req.query;

    const data = await getListsOfDataFromAnId(id, type, q, dataType);

    res.send(data).status(data.success ? 200 : 400);
  },
  async getCharactersSerie(req, res) {
    const { id } = req.params;
    let dataType = "characters";
    const q = req.query;

    const data = await getListsOfDataFromAnId(id, type, q, dataType);

    res.send(data).status(data.success ? 200 : 400);
  },
  async getCreatorsSerie(req, res) {
    const { id } = req.params;
    let dataType = "creators";
    const q = req.query;

    const data = await getListsOfDataFromAnId(id, type, q, dataType);

    res.send(data).status(data.success ? 200 : 400);
  },
  async getEventsSerie(req, res) {
    const { id } = req.params;
    let dataType = "events";
    const q = req.query;

    const data = await getListsOfDataFromAnId(id, type, q, dataType);

    res.send(data).status(data.success ? 200 : 400);
  },

  async getStoriesSerie(req, res) {
    const { id } = req.params;
    let dataType = "stories";
    const q = req.query;

    const data = await getListsOfDataFromAnId(id, type, q, dataType);

    res.send(data).status(data.success ? 200 : 400);
  },
};
