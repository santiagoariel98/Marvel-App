const type = "stories";

const {
  getComics,
  getCharacters,
  getCreators,
  getSeries,
  getStories,
  getWithQuery,
  getTotalPages,
  getById,
  getSortQueries,
  getEvents,
} = require("../utils");

const { getInfo, getListsOfDataFromAnId } = require("../newUtils");

module.exports = {
  async getAllStories(req, res) {
    const q = req.query;
    const characters = await getInfo(type, q);
    res.send(characters).status(characters.success ? 200 : 400);
  },
  async getNewStories(req, res) {
    try {
      const stories = await getWithQuery(
        { orderBy: "-modified", limit: 10 },
        type
      );
      res.send(stories);
    } catch (error) {
      res.send({ error: "An error has occurred", success: false }).status(500);
    }
  },

  async getStorieById(req, res) {
    const { id } = req.params;
    let characters = { data: [], available: 0 },
      comics = { data: [], available: 0 },
      creators = { data: [], available: 0 },
      series = { data: [], available: 0 },
      events = { data: [], available: 0 };
    const storie = await getById(id, type);
    if (storie.success) {
      const data = storie.data;
      if (data.characters.available) {
        characters = await getCharacters(data.id, { limit: 10 }, type);
      }
      if (data.comics.available) {
        comics = await getComics(data.id, { limit: 10 }, type);
      }
      if (data.creators.available) {
        creators = await getCreators(data.id, { limit: 10 }, type);
      }
      if (data.series.available) {
        series = await getSeries(data.id, { limit: 10 }, type);
      }
      if (data.events.available) {
        events = await getEvents(data.id, { limit: 10 }, type);
      }
      const storieInfo = {
        id: data.id,
        desc: data.description,
        title: data.title,
        type: data.type,
        events,
        comics,
        characters,
        series,
        creators,
      };
      res.send({ ...storie, data: storieInfo });
    } else {
      res.send(storie);
    }
  },
  async getComicsStorie(req, res) {
    const { id } = req.params;
    let dataType = "comics";
    const q = req.query;

    const data = await getListsOfDataFromAnId(id, type, q, dataType);

    res.send(data).status(data.success ? 200 : 400);
  },
  async getCharactersStorie(req, res) {
    const { id } = req.params;
    let dataType = "characters";
    const q = req.query;

    const data = await getListsOfDataFromAnId(id, type, q, dataType);

    res.send(data).status(data.success ? 200 : 400);
  },
  async getCreatorsStorie(req, res) {
    const { id } = req.params;
    let dataType = "creators";
    const q = req.query;

    const data = await getListsOfDataFromAnId(id, type, q, dataType);

    res.send(data).status(data.success ? 200 : 400);
  },
  async getEventsStorie(req, res) {
    const { id } = req.params;
    let dataType = "events";
    const q = req.query;

    const data = await getListsOfDataFromAnId(id, type, q, dataType);

    res.send(data).status(data.success ? 200 : 400);
  },
  async getSeriesStorie(req, res) {
    const { id } = req.params;
    let dataType = "series";
    const q = req.query;

    const data = await getListsOfDataFromAnId(id, type, q, dataType);

    res.send(data).status(data.success ? 200 : 400);
  },
};
