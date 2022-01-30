const type = "creators";

const {
  getComics,
  getEvents,
  getSeries,
  getStories,
  getWithQuery,
  getById,
  getTotalPages,
  getSortQueries,
} = require("../utils");

module.exports = {
  async getAllCreators(req, res) {
    try {
      const q = req.query;
      const page = q.page > 2 ? q.page : 1;
      const limit = q.limit > 20 ? q.limit : 20;
      const orderBy = getSortQueries(type, q.orderBy);

      const total = +q.total || (await getTotalPages(limit, type));
      const offset =
        page > total ? total * limit - limit : page * limit - limit;

      const creators = await getWithQuery({ limit, offset, orderBy }, type);
      res.send({ pages: total, page: offset / limit + 1, ...creators });
    } catch (error) {
      res.send({ error: "An error has occurred", success: false }).status(500);
    }
  },
  async getNewCreators(req, res) {
    try {
      const creators = await getWithQuery(
        { orderBy: "-modified", limit: 10 },
        type
      );
      res.send(creators);
    } catch (error) {
      res.send({ error: "An error has occurred", success: false }).status(500);
    }
  },
  async getCreatorById(req, res) {
    const { id } = req.params;
    let comics = { data: [], available: 0 },
      events = { data: [], available: 0 },
      series = { data: [], available: 0 },
      stories = { data: [], available: 0 };

    const creator = await getById(id, type);
    if (creator.success) {
      const data = creator.data;
      if (data.comics.available) {
        comics = await getComics(data.id, { limit: 10 }, type);
      }
      if (data.events.available) {
        events = await getEvents(data.id, { limit: 10 }, type);
      }
      if (data.series.available) {
        series = await getSeries(data.id, { limit: 10 }, type);
      }
      if (data.stories.available) {
        stories = await getStories(data.id, { limit: 10 }, type);
      }
      const creatorInfo = {
        id: data.id,
        fullname: data.fullName,
        img: data.thumbnail.path + "." + data.thumbnail.extension,
        comics,
        events,
        series,
        stories,
      };
      res.send({ ...creator, data: creatorInfo });
    } else {
      res.send(creator);
    }
  },
  async getComicsCreator(req, res) {
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
  async getEventsCreator(req, res) {
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
  async getSeriesCreator(req, res) {
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
  async getStoriesCreator(req, res) {
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
