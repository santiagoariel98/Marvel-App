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
} = require("../utils.js");

module.exports = {
  async getCharacters(req, res) {
    try {
      const q = req.query;
      const page = q.page > 2 ? q.page : 1;
      const limit = q.limit > 20 ? q.limit : 20;

      const total = +q.total || (await getTotalPages(limit, type));
      const offset =
        page > total ? total * limit - limit : page * limit - limit;

      const characters = await getWithQuery({ limit, offset }, type);
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
    let comics;
    const { id } = req.params; // ID Personaje/Characters
    const q = req.query;

    const limit = q.limit && q.limit >= 50 && q.limit <= 100 ? q.limit : 50; // min: 10, max: 100, default: 20
    const page = q.page && q.page > 0 ? q.page : 1; // min:1, max: n, default:1
    const totalComics = isNaN(q.totalComics) ? false : q.totalComics; // min: 1, default: false

    let offset, tPage;

    if (totalComics && page >= 2) {
      tPage = Math.ceil(totalComics / limit);
      offset = page >= tPage ? tPage * limit - limit : page * limit - limit;
      comics = await getComics(id, { limit, offset }, type);
    } else {
      comics = await getComics(id, { limit }, type);
    }
    res.send(comics);
  },
  async getEventsCharacter(req, res) {
    const { id } = req.params; // ID Personaje/Characters
    const q = req.query;
    let events;
    const limit = q.limit && q.limit >= 50 && q.limit <= 100 ? q.limit : 50; // min: 10, max: 100, default: 20
    const page = q.page && q.page > 0 ? q.page : 1; // min:1, max: n, default:1
    const totalEvents = isNaN(q.totalEvents) ? "" : q.totalEvents; // min: 1, default: false

    let offset, tPage;
    if (totalEvents && page >= 2) {
      tPage = Math.ceil(totalEvents / limit);
      offset = page >= tPage ? tPage * limit - limit : page * limit - limit;
      events = await getEvents(id, { limit, offset }, type);
    } else {
      events = await getEvents(id, { limit }, type);
    }
    res.send(events);
  },
  async getSeriesCharacter(req, res) {
    const { id } = req.params; // ID Personaje/Characters
    const q = req.query;
    let series;
    const limit = q.limit && q.limit >= 50 && q.limit <= 100 ? q.limit : 50; // min: 50, max: 100, default: 50
    const page = q.page && q.page > 0 ? q.page : 1; // min:1, max: n, default:1
    const totalSeries = isNaN(q.totalSeries) ? "" : q.totalSeries; // min: 1, default: false

    let offset, tPage;
    if (totalSeries && page >= 2) {
      tPage = Math.ceil(totalSeries / limit);
      offset = page >= tPage ? tPage * limit - limit : page * limit - limit;
      series = await getSeries(id, { limit, offset }, type);
    } else {
      series = await getSeries(id, { limit }, type);
    }
    res.send(series);
  },

  async getStoriesCharacter(req, res) {
    const { id } = req.params; // ID Personaje/Characters
    const q = req.query;
    let stories;
    const limit = q.limit && q.limit >= 50 && q.limit <= 100 ? q.limit : 50; // min: 10, max: 100, default: 20
    const page = q.page && q.page > 0 ? q.page : 1; // min:1, max: n, default:1
    const totalStories = isNaN(q.totalStories) ? "" : q.totalStories; // min: 1, default: false

    let offset, tPage;
    if (totalStories && page >= 2) {
      tPage = Math.ceil(totalStories / limit);
      offset = page >= tPage ? tPage * limit - limit : page * limit - limit;
      stories = await getStories(id, { limit, offset }, type);
    } else {
      stories = await getStories(id, { limit }, type);
    }
    res.send(stories);
  },
};
