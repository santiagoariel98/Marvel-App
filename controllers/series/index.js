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
        comics = await getComics(data.id, type, { limit: 10 }, type);
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
  async getCharactersSerie(req, res) {
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
      comics = await getCharacters(id, { limit, offset });
    } else {
      comics = await getCharacters(id, { limit });
    }
    res.send(comics);
  },
  async getCreatorsSerie(req, res) {
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
      events = await getCreators(id, { limit, offset });
    } else {
      events = await getCreators(id, { limit });
    }
    res.send(events);
  },
  async getEventsSerie(req, res) {
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

  async getStoriesSerie(req, res) {
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
