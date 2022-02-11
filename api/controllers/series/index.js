const type = "series";

const { getListsOfDataFromAnId, getInfo, getInfoById } = require("../utils");

module.exports = {
  async getAllSeries(req, res) {
    const q = req.query;
    const characters = await getInfo(type, q);
    res.send(characters).status(characters.success ? 200 : 400);
  },
  async getNewsSeries(req, res) {
    const series = await getInfo(type, {
      limit: 10,
      startYear: 2022,
    });

    res.send(series).status(series.success ? 200 : 400);
  },
  async getSerieById(req, res) {
    const { id } = req.params;
    const dataID = await getInfoById(id, type);
    res.send(dataID).status(dataID.success ? 200 : 400);
  },
  async getComicsSerie(req, res) {
    const { id } = req.params;
    let datatype = "comics";
    const q = req.query;

    const data = await getListsOfDataFromAnId(id, type, q, datatype);

    res.send(data).status(data.success ? 200 : 400);
  },
  async getCharactersSerie(req, res) {
    const { id } = req.params;
    let datatype = "characters";
    const q = req.query;

    const data = await getListsOfDataFromAnId(id, type, q, datatype);

    res.send(data).status(data.success ? 200 : 400);
  },
  async getCreatorsSerie(req, res) {
    const { id } = req.params;
    let datatype = "creators";
    const q = req.query;

    const data = await getListsOfDataFromAnId(id, type, q, datatype);

    res.send(data).status(data.success ? 200 : 400);
  },
  async getEventsSerie(req, res) {
    const { id } = req.params;
    let datatype = "events";
    const q = req.query;

    const data = await getListsOfDataFromAnId(id, type, q, datatype);

    res.send(data).status(data.success ? 200 : 400);
  },

  async getStoriesSerie(req, res) {
    const { id } = req.params;
    let datatype = "stories";
    const q = req.query;

    const data = await getListsOfDataFromAnId(id, type, q, datatype);

    res.send(data).status(data.success ? 200 : 400);
  },
};
