const res = require("express/lib/response");
const {
  newsComics,
  getNextReleases,
  newsCharacters,
  getWithQuery,
} = require("../utils");

const { getInfo, getListsOfDataFromAnId } = require("../utils");

module.exports = {
  async pruebra(req, res) {
    const { id } = req.params;
    const info = await getListsOfDataFromAnId(id, "comics", q, "characters");

    res.send(info);
  },

  async getNewsComics(req, res) {
    const comics = await newsComics("comics");
    res.send(comics);
  },
  async getNextReleases(req, res) {
    const comics = await getNextReleases("comics");
    res.send(comics);
  },
  async getCharacters(req, res) {
    const characters = await newsCharacters();
    res.send(characters);
  },
  async getEvents(req, res) {
    const events = await getWithQuery(
      { orderBy: "-startDate", offset: 1 },
      "events"
    );
    res.send(events);
  },
  async getNewsSeries(req, res) {
    const series = await getWithQuery(
      { orderBy: "-startYear", limit: 10 },
      "series"
    );
    res.send(series);
  },
};
