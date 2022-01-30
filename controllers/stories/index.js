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
    let comics;
    const { id } = req.params; // ID Personaje/Characters
    const q = req.query;

    const limit = q.limit && q.limit >= 50 && q.limit <= 100 ? q.limit : 50; // min: 10, max: 100, default: 20
    const page = q.page && q.page > 0 ? q.page : 1; // min:1, max: n, default:1
    const totalComics = isNaN(q.totalComics) ? false : q.totalComics; // min: 1, default: false
    // totalComics = es: "cómics" en los que aparece el personaje.
    // totalComics = en: comics in which the character appears.

    let offset, tPage;
    // tPage = es: Total de "paginacion" que tiene los "cómics" de un personaje.
    // tPage = en: Total "pagination" of a character's "comics".
    if (totalComics && page >= 2) {
      tPage = Math.ceil(totalComics / limit);
      offset = page >= tPage ? tPage * limit - limit : page * limit - limit;
      comics = await getComics(id, { limit, offset }, type);
    } else {
      comics = await getComics(id, { limit }, type);
    }
    res.send(comics);
  },
  async getCharactersStorie(req, res) {
    let comics;
    const { id } = req.params; // ID Personaje/Characters
    const q = req.query;

    const limit = q.limit && q.limit >= 50 && q.limit <= 100 ? q.limit : 50; // min: 10, max: 100, default: 20
    const page = q.page && q.page > 0 ? q.page : 1; // min:1, max: n, default:1
    const totalCharacters = isNaN(q.totalCharacters)
      ? false
      : q.totalCharacters; // min: 1, default: false
    // totalCharacters = es: "cómics" en los que aparece el personaje.
    // totalCharacters = en: comics in which the character appears.

    let offset, tPage;
    // tPage = es: Total de "paginacion" que tiene los "cómics" de un personaje.
    // tPage = en: Total "pagination" of a character's "comics".
    if (totalCharacters && page >= 2) {
      tPage = Math.ceil(totalCharacters / limit);
      offset = page >= tPage ? tPage * limit - limit : page * limit - limit;
      comics = await getCharacters(id, { limit, offset }, type);
    } else {
      comics = await getCharacters(id, { limit }, type);
    }
    res.send(comics);
  },
  async getCreatorsStorie(req, res) {
    const { id } = req.params; // ID Personaje/Characters
    const q = req.query;
    let events;
    const limit = q.limit && q.limit >= 50 && q.limit <= 100 ? q.limit : 50; // min: 10, max: 100, default: 20
    const page = q.page && q.page > 0 ? q.page : 1; // min:1, max: n, default:1
    const totalCreators = isNaN(q.totalCreators) ? "" : q.totalCreators; // min: 1, default: false
    // totalCreators = es: "eventos" en los que aparece el personaje.
    // totalCreators = en: events in which the character appears.

    let offset, tPage;
    // tPage = es: Total de "paginacion" que tiene los "eventos" de un personaje.
    // tPage = en: Total "pagination" of a character's "events".
    if (totalCreators && page >= 2) {
      tPage = Math.ceil(totalCreators / limit);
      offset = page >= tPage ? tPage * limit - limit : page * limit - limit;
      events = await getCreators(id, { limit, offset }, type);
    } else {
      events = await getCreators(id, { limit }, type);
    }
    res.send(events);
  },
  async getEventsStorie(req, res) {
    const { id } = req.params; // ID Personaje/Characters
    const q = req.query;
    let events;
    const limit = q.limit && q.limit >= 50 && q.limit <= 100 ? q.limit : 50; // min: 50, max: 100, default: 50
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

  async getSeriesStorie(req, res) {
    const { id } = req.params; // ID Personaje/Characters
    const q = req.query;
    let series;
    const limit = q.limit && q.limit >= 50 && q.limit <= 100 ? q.limit : 50; // min: 10, max: 100, default: 20
    const page = q.page && q.page > 0 ? q.page : 1; // min:1, max: n, default:1
    const totalStories = isNaN(q.totalStories) ? "" : q.totalStories; // min: 1, default: false

    let offset, tPage;
    if (totalStories && page >= 2) {
      tPage = Math.ceil(totalStories / limit);
      offset = page >= tPage ? tPage * limit - limit : page * limit - limit;
      series = await getSeries(id, { limit, offset }, type);
    } else {
      series = await getSeries(id, { limit }, type);
    }
    res.send(series);
  },
};
