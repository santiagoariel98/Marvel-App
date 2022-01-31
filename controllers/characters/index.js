const type = "characters";

const {
  getCharacters,
  getComics,
  getEvents,
  getSeries,
  getStories,
  getById,
  getWithQuery,
  getTotalPages,
  getSortQueries,
} = require("../utils.js");
const { getInfo } = require("../newUtils");

module.exports = {
  async getCharacters(req, res) {
    try {
      const q = req.query;
      const page = q.page > 1 ? q.page : 1;
      const limit = q.limit > 20 ? q.limit : 20;
      const orderBy = getSortQueries(type, q.orderBy);
      const total = +q.total || (await getTotalPages(type));
      const offset =
        page > total ? total * limit - limit : page * limit - limit;
      const characters = await getWithQuery({ limit, offset, orderBy }, type);

      res.send({ pages: total, page: offset / limit + 1, ...characters });
    } catch (error) {
      res.send({ error: "An error has occurred", success: false }).status(500);
    }
  },
  async getNewCharacters(req, res) {
    try {
      const characters = await getWithQuery(
        { orderBy: "-modified", limit: 10 },
        type
      );
      res.send(characters);
    } catch (error) {
      res.send({ error: "An error has occurred", success: false }).status(500);
    }
  },
  async getCharacterById(req, res) {
    const { id } = req.params;

    let events = { data: [], available: 0 },
      comics = { data: [], available: 0 },
      stories = { data: [], available: 0 },
      series = { data: [], available: 0 };

    const character = await getById(id, type);
    if (character.success) {
      let data = character.data;
      if (data.events.available) {
        events = await getEvents(id, { limit: 10 }, type);
      }
      if (data.comics.available) {
        comics = await getComics(id, { limit: 10 }, type);
      }
      if (data.stories.available) {
        stories = await getCharacters(id, { limit: 10 }, type);
      }
      if (data.stories.available) {
        series = await getSeries(id, { limit: 10 }, type);
      }
      const characterInfo = {
        id: id,
        name: data.name,
        img: data.thumbnail.path + "." + data.thumbnail.extension,
        series,
        comics,
        events,
        stories,
      };
      res.send({ ...character, data: characterInfo });
    } else {
      res.send(character);
    }
  },
  async getComicsCharacter(req, res) {
    const { id } = req.params; // ID Personaje/Characters
    const getType = type + "/" + id + "/" + "comics";
    const q = req.query;

    const page = q.page > 1 ? q.page : 1;
    const limit = q.limit > 50 ? q.limit : 50;

    const orderBy = getSortQueries("comics", q.orderBy);

    const total = +q.total || (await getTotalPages(getType));
    const offset = page > total ? total * limit - limit : page * limit - limit;
    const data = await getComics(id, { limit, offset, orderBy }, type);
    res.send({ pages: total, page: offset / limit + 1, ...data });
  },
  async getEventsCharacter(req, res) {
    const { id } = req.params; // ID Personaje/Characters
    const getType = type + "/" + id + "/" + "events";
    const q = req.query;

    const page = q.page > 1 ? q.page : 1;
    const limit = q.limit > 50 ? q.limit : 50;

    const orderBy = getSortQueries("events", q.orderBy);

    const total = +q.total || (await getTotalPages(getType));
    const offset = page > total ? total * limit - limit : page * limit - limit;
    const data = await getEvents(id, { limit, offset, orderBy }, type);
    res.send({ pages: total, page: offset / limit + 1, ...data });
  },
  async getSeriesCharacter(req, res) {
    const { id } = req.params; // ID Personaje/Characters
    const getType = type + "/" + id + "/" + "series";
    const q = req.query;

    const page = q.page > 1 ? q.page : 1;
    const limit = q.limit > 50 ? q.limit : 50;

    const orderBy = getSortQueries("series", q.orderBy);

    const total = +q.total || (await getTotalPages(getType));
    const offset = page > total ? total * limit - limit : page * limit - limit;
    const data = await getSeries(id, { limit, offset, orderBy }, type);
    res.send({ pages: total, page: offset / limit + 1, ...data });
  },

  async getStoriesCharacter(req, res) {
    const { id } = req.params; // ID Personaje/Characters
    const getType = type + "/" + id + "/" + "stories";
    const q = req.query;

    const page = q.page > 1 ? q.page : 1;
    const limit = q.limit > 50 ? q.limit : 50;

    const orderBy = getSortQueries("stories", q.orderBy);

    const total = +q.total || (await getTotalPages(getType));
    const offset = page > total ? total * limit - limit : page * limit - limit;
    const data = await getStories(id, { limit, offset, orderBy }, type);
    res.send({ pages: total, page: offset / limit + 1, ...data });
  },
};
