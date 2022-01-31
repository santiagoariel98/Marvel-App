const type = "characters";

const { getInfo, getListsOfDataFromAnId, getInfoById } = require("../utils");

module.exports = {
  async getCharacters(req, res) {
    const q = req.query;
    const characters = await getInfo(type, q);
    res.send(characters).status(characters.success ? 200 : 400);
  },
  async getCharacterById(req, res) {
    const { id } = req.params;
    const dataID = await getInfoById(id, type);
    res.send(dataID);
  },
  async getComicsCharacter(req, res) {
    const { id } = req.params;
    let dataType = "comics";
    const q = req.query;

    const data = await getListsOfDataFromAnId(id, type, q, dataType);

    res.send(data).status(data.success ? 200 : 400);
  },
  async getEventsCharacter(req, res) {
    const { id } = req.params;
    let dataType = "events";
    const q = req.query;

    const data = await getListsOfDataFromAnId(id, type, q, dataType);

    res.send(data).status(data.success ? 200 : 400);
  },
  async getSeriesCharacter(req, res) {
    const { id } = req.params;
    let dataType = "series";
    const q = req.query;

    const data = await getListsOfDataFromAnId(id, type, q, dataType);

    res.send(data).status(data.success ? 200 : 400);
  },

  async getStoriesCharacter(req, res) {
    const { id } = req.params;
    let dataType = "stories";
    const q = req.query;

    const data = await getListsOfDataFromAnId(id, type, q, dataType);

    res.send(data).status(data.success ? 200 : 400);
  },
};
