const type = "series";

const {
  getById,
  getWithQuery,
  getTotalPages,
  getCharacters,
  getEvents,
  getCreators,
  getStories,
  getComics,
  getSortQueries,
} = require("../utils");
module.exports = {
  async getAllSeries(req, res) {
    try {
      const q = req.query;
      const page = q.page > 2 ? q.page : 1;
      const limit = q.limit > 20 ? q.limit : 20;
      const orderBy = getSortQueries(type, q.orderBy);

      const total = +q.total || (await getTotalPages(limit, type));
      const offset =
        page > total ? total * limit - limit : page * limit - limit;

      const series = await getWithQuery({ limit, offset, orderBy }, type);
      res.send({ pages: total, page: offset / limit + 1, ...series });
    } catch (error) {
      res.send({ error: "An error has occurred", success: false }).status(500);
    }
  },
  async getNewSeries(req, res) {
    try {
      const series = await getWithQuery(
        { orderBy: "-modified", limit: 10 },
        type
      );
      res.send(series);
    } catch (error) {
      console.log(error);
      res.send({ error: "An error has occurred", success: false }).status(500);
    }
  },

  async getSerieById(req, res) {
    const { id } = req.params;
    let characters = { data: [], available: 0 },
      comics = { data: [], available: 0 },
      creators = { data: [], available: 0 },
      stories = { data: [], available: 0 },
      events = { data: [], available: 0 };

    const serie = await getById(id, type);
    if (serie.success) {
      const data = serie.data;
      if (data.characters.available) {
        characters = await getCharacters(data.id, { limit: 10 }, type);
      }
      if (data.comics.available) {
        comics = await getComics(data.id, { limit: 10 }, type);
      }
      if (data.creators.available) {
        creators = await getCreators(data.id, { limit: 10 }, type);
      }
      if (data.stories.available) {
        stories = await getStories(data.id, { limit: 10 }, type);
      }
      if (data.events.available) {
        events = await getEvents(data.id, { limit: 10 }, type);
      }
      const characterInfo = {
        id: data.id,
        name: data.name,
        img: data.thumbnail.path + "." + data.thumbnail.extension,
        events,
        comics,
        characters,
        stories,
        creators,
      };
      res.send({ ...serie, data: characterInfo });
    } else {
      res.send(serie);
    }
  },
  async getComicsSerie(req, res) {
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
  async getCharactersSerie(req, res) {
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
  async getCreatorsSerie(req, res) {
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
  async getEventsSerie(req, res) {
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

  async getStoriesSerie(req, res) {
    const { id } = req.params; // ID Personaje/Characters
    const getType = type + "/" + id + "/" + "stories";
    const q = req.query;

    const page = q.page > 1 ? q.page : 1;
    const limit = q.limit > 50 ? q.limit : 50;

    const orderBy = getSortQueries("stories", q.orderBy);

    const total = +q.total || (await getTotalPages(limit, getType));
    const offset = page > total ? total * limit - limit : page * limit - limit;
    const data = await getStories(id, { limit, offset, orderBy }, type);
    res.send({ pages: total, page: offset / limit + 1, ...data });
  },
};
