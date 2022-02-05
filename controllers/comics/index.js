const type = "comics";

const {
  getListsOfDataFromAnId,
  getInfo,
  getInfoById,
  getCurrentDate,
  getNextDay,
  getLastWeek,
  getNextWeek,
} = require("../utils");

module.exports = {
  async getAllComics(req, res) {
    const q = req.query;
    const characters = await getInfo(type, q);
    res.send(characters).status(characters.success ? 200 : 400);
  },
  async getLastComics(req, res) {
    let day = getCurrentDate();
    let lastWeek = getLastWeek();
    let lastInfo = lastWeek + "," + day;
    const lastComics = await getInfo("comics", {
      dateRange: lastInfo,
      limit: 15,
      orderBy: "-modified",
    });

    res.send(lastComics).status(lastComics.success ? 200 : 400);
  },
  async getNewsComics(req, res) {
    let nextDay = getNextDay();
    let nextWeek = getNextWeek();
    let newInfo = nextDay + "," + nextWeek;

    const nextComics = await getInfo("comics", {
      dateRange: newInfo,
      limit: 15,
      orderBy: "modified",
    });
    res.send(nextComics).status(nextComics.success ? 200 : 400);
  },
  async getComicById(req, res) {
    const { id } = req.params;
    const dataID = await getInfoById(id, type);
    res.send(dataID).status(dataID.success ? 200 : 400);
  },
  async getCharactersComic(req, res) {
    const { id } = req.params;
    let dataType = "characters";
    const q = req.query;

    const data = await getListsOfDataFromAnId(id, type, q, dataType);

    res.send(data).status(data.success ? 200 : 400);
  },
  async getCreatorsComic(req, res) {
    const { id } = req.params;
    let dataType = "creators";
    const q = req.query;

    const data = await getListsOfDataFromAnId(id, type, q, dataType);

    res.send(data).status(data.success ? 200 : 400);
  },
  async getEventsComic(req, res) {
    const { id } = req.params;
    let dataType = "events";
    const q = req.query;

    const data = await getListsOfDataFromAnId(id, type, q, dataType);

    res.send(data).status(data.success ? 200 : 400);
  },
  async getStoriesComic(req, res) {
    const { id } = req.params;
    let dataType = "stories";
    const q = req.query;

    const data = await getListsOfDataFromAnId(id, type, q, dataType);

    res.send(data).status(data.success ? 200 : 400);
  },
};
