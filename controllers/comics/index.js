const type = "comics";

const {
  getCharacters,
  getCreators,
  getEvents,
  getStories,
  getWithQuery,
  getTotalPages,
  getById,
  getSortQueries,
} = require("../utils");

module.exports = {
  async getAllComics(req, res) {
    try {
      const q = req.query;
      const page = q.page > 1 ? q.page : 1;
      const limit = q.limit > 20 ? q.limit : 20;
      const orderBy = getSortQueries(type, q.orderBy);

      const total = +q.total || (await getTotalPages(limit, type));
      const offset =
        page > total ? total * limit - limit : page * limit - limit;
      const comics = await getWithQuery({ limit, offset, orderBy }, type);
      res.send({ pages: total, page: offset / limit + 1, ...comics });
    } catch (error) {
      console.log(error);
      res.send({ error: "An error has occurred", success: false }).status(500);
    }
  },
  async getNewComics(req, res) {
    try {
      const comics = await getWithQuery(
        { orderBy: "-modified", limit: 10 },
        type
      );
      res.send(comics);
    } catch (error) {
      res.send({ error: "An error has occurred", success: false }).status(500);
    }
  },
  async getComicById(req, res) {
    const { id } = req.params;
    let characters = { data: [], available: 0 },
      creators = { data: [], available: 0 },
      events = { data: [], available: 0 },
      stories = { data: [], available: 0 };

    const comic = await getById(id, type);
    if (comic.success) {
      let data = comic.data;
      if (data.characters.available) {
        characters = await getCharacters(data.id, {}, type);
      }
      if (data.creators.available) {
        creators = await getCreators(data.id, {}, type);
      }
      if (data.events.available) {
        events = await getEvents(data.id, {}, type);
      }
      if (data.stories.available) {
        stories = await getStories(data.id, {}, type);
      }
      const comicInfo = {
        id: data.id,
        title: data.title,
        img: data.thumbnail.path + "." + data.thumbnail.extension,
        pageCount: data.pageCount,
        dates: data.dates.filter((date) => date.type === "onsaleDate")[0],
        characters,
        creators,
        events,
        stories,
      };
      res.send({ ...comic, data: comicInfo });
    } else {
      res.send(character);
    }
  },
  async getCharactersComic(req, res) {
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
  async getCreatorsComic(req, res) {
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
  async getEventsComic(req, res) {
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
  async getStoriesComic(req, res) {
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
