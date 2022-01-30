const type = "events";

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
} = require("../utils");

module.exports = {
  async getAllEvents(req, res) {
    try {
      const q = req.query;
      const page = q.page > 2 ? q.page : 1;
      const limit = q.limit > 20 ? q.limit : 20;
      const orderBy = getSortQueries(type, q.orderBy);

      const total = +q.total || (await getTotalPages(limit, type));
      const offset =
        page > total ? total * limit - limit : page * limit - limit;

      const events = await getWithQuery({ limit, offset, orderBy }, type);
      res.send({ pages: total, page: offset / limit + 1, ...events });
    } catch (error) {
      res.send({ error: "An error has occurred", success: false }).status(500);
    }
  },
  async getNewEvents(req, res) {
    try {
      const events = await getWithQuery(
        { orderBy: "-modified", limit: 10 },
        type
      );
      res.send(events);
    } catch (error) {
      res.send({ error: "An error has occurred", success: false }).status(500);
    }
  },
  async getEventById(req, res) {
    const { id } = req.params;
    let characters = { data: [], available: 0 },
      comics = { data: [], available: 0 },
      creators = { data: [], available: 0 },
      series = { data: [], available: 0 },
      stories = { data: [], available: 0 };
    const events = await getById(id, type);

    if (events.success) {
      const data = events.data;
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
      if (data.stories.available) {
        stories = await getStories(data.id, { limit: 10 }, type);
      }
      const eventInfo = {
        id: data.id,
        title: data.title,
        startAndEnd: {
          start: data.start,
          end: data.end,
        },
        next: data.next.name,
        previous: data.previous.name,
        desc: data.description,
        characters,
        comics,
        creators,
        stories,
      };
      res.send({ ...events, data: eventInfo });
    } else {
      res.send(events).status(400);
    }
  },
  async getCharactersEvent(req, res) {
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
  async getComicsEvent(req, res) {
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
  async getCreatorsEvent(req, res) {
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
  async getSeriesEvent(req, res) {
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
  async getStoriesEvent(req, res) {
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
