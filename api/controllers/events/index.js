const type = "events";

const { getInfo, getListsOfDataFromAnId, getInfoById } = require("../utils");

module.exports = {
  async getAllEvents(req, res) {
    const q = req.query;
    const data = await getInfo(type, q);
    res.send(data).status(data.success ? 200 : 400);
  },
  async getNewsEvents(req, res) {
    const events = await getInfo("events", {
      orderBy: "-startDate",
      limit: 6,
    });

    res.send(events).status(events.success ? 200 : 400);
  },
  async getEventById(req, res) {
    const { id } = req.params;
    const dataID = await getInfoById(id, type);
    res.send(dataID).status(dataID.success ? 200 : 400);
  },
  async getCharactersEvent(req, res) {
    const { id } = req.params;
    let dataType = "characters";
    const q = req.query;

    const data = await getListsOfDataFromAnId(id, type, q, dataType);

    res.send(data).status(data.success ? 200 : 400);
  },
  async getComicsEvent(req, res) {
    const { id } = req.params;
    let dataType = "comics";
    const q = req.query;

    const data = await getListsOfDataFromAnId(id, type, q, dataType);

    res.send(data).status(data.success ? 200 : 400);
  },
  async getCreatorsEvent(req, res) {
    const { id } = req.params;
    let dataType = "creators";
    const q = req.query;

    const data = await getListsOfDataFromAnId(id, type, q, dataType);

    res.send(data).status(data.success ? 200 : 400);
  },
  async getSeriesEvent(req, res) {
    const { id } = req.params;
    let dataType = "series";
    const q = req.query;

    const data = await getListsOfDataFromAnId(id, type, q, dataType);

    res.send(data).status(data.success ? 200 : 400);
  },
  async getStoriesEvent(req, res) {
    const { id } = req.params;
    let dataType = "stories";
    const q = req.query;

    const data = await getListsOfDataFromAnId(id, type, q, dataType);

    res.send(data).status(data.success ? 200 : 400);
  },
};
