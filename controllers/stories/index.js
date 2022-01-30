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

const MARVEL_API = process.env.MARVEL_API;

module.exports = {
  async getAllStories(req, res) {
    try {
      const q = req.query;
      const page = q.page > 2 ? q.page : 1;
      const limit = q.limit > 20 ? q.limit : 20;
      const orderBy = getSortQueries(type, q.orderBy);

      const total = +q.total || (await getTotalPages(limit, type));
      const offset =
        page > total ? total * limit - limit : page * limit - limit;

      const stories = await getWithQuery({ limit, offset, orderBy }, type);
      res.send({ pages: total, page: offset / limit + 1, ...stories });
    } catch (error) {
      res.send({ error: "An error has occurred", success: false }).status(500);
    }
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
        characters = await getCharacters(data.id, {}, type);
      }
      if (data.comics.available) {
        comics = await getComics(data.id, {}, type);
      }
      if (data.creators.available) {
        creators = await getCreators(data.id, {}, type);
      }
      if (data.series.available) {
        series = await getSeries(data.id, {}, type);
      }
      if (data.events.available) {
        events = await getEvents(data.id, {}, type);
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
    const { id } = req.params; // ID Personaje/Characters
    const getType = type + "/" + id + "/" + "comics";
    const q = req.query;

    const page = q.page > 1 ? q.page : 1;
    const limit = q.limit > 50 ? q.limit : 50;

    const orderBy = getSortQueries("comics", q.orderBy);

    const total = +q.total || (await getTotalPages(limit, getType));
    const offset = page > total ? total * limit - limit : page * limit - limit;
    const data = await getComics(id, { limit, offset, orderBy }, type);
    res.send({ pages: total, page: offset / limit + 1, ...data });
  },
  async getCharactersStorie(req, res) {
    const { id } = req.params; // ID Personaje/Characters
    const getType = type + "/" + id + "/" + "characters";
    const q = req.query;

    const page = q.page > 1 ? q.page : 1;
    const limit = q.limit > 50 ? q.limit : 50;

    const orderBy = getSortQueries("characters", q.orderBy);

    const total = +q.total || (await getTotalPages(limit, getType));
    const offset = page > total ? total * limit - limit : page * limit - limit;
    const data = await getCharacters(id, { limit, offset, orderBy }, type);
    res.send({ pages: total, page: offset / limit + 1, ...data });
  },
  async getCreatorsStorie(req, res) {
    const { id } = req.params; // ID Personaje/Characters
    const getType = type + "/" + id + "/" + "creators";
    const q = req.query;

    const page = q.page > 1 ? q.page : 1;
    const limit = q.limit > 50 ? q.limit : 50;

    const orderBy = getSortQueries("creators", q.orderBy);

    const total = +q.total || (await getTotalPages(limit, getType));
    const offset = page > total ? total * limit - limit : page * limit - limit;
    const data = await getCreators(id, { limit, offset, orderBy }, type);
    res.send({ pages: total, page: offset / limit + 1, ...data });
  },
  async getEventsStorie(req, res) {
    const { id } = req.params; // ID Personaje/Characters
    const getType = type + "/" + id + "/" + "events";
    const q = req.query;

    const page = q.page > 1 ? q.page : 1;
    const limit = q.limit > 50 ? q.limit : 50;

    const orderBy = getSortQueries("events", q.orderBy);

    const total = +q.total || (await getTotalPages(limit, getType));
    const offset = page > total ? total * limit - limit : page * limit - limit;
    const data = await getEvents(id, { limit, offset, orderBy }, type);
    res.send({ pages: total, page: offset / limit + 1, ...data });
  },
  async getSeriesStorie(req, res) {
    const { id } = req.params; // ID Personaje/Characters
    const getType = type + "/" + id + "/" + "series";
    const q = req.query;

    const page = q.page > 1 ? q.page : 1;
    const limit = q.limit > 50 ? q.limit : 50;

    const orderBy = getSortQueries("series", q.orderBy);

    const total = +q.total || (await getTotalPages(limit, getType));
    const offset = page > total ? total * limit - limit : page * limit - limit;
    const data = await getSeries(id, { limit, offset, orderBy }, type);
    res.send({ pages: total, page: offset / limit + 1, ...data });
  },
};
