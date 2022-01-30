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
      if (data.stories.available) {
        stories = await getStories(data.id, {}, type);
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
    let characters;
    const { id } = req.params;
    const q = req.query;

    const limit = q.limit && q.limit >= 50 && q.limit <= 100 ? q.limit : 50;
    const page = q.page && q.page > 0 ? q.page : 1;
    const totalCharacters = isNaN(q.totalCharacters)
      ? false
      : q.totalCharacters;
    let offset, tPage;
    if (totalCharacters && page >= 2) {
      tPage = Math.ceil(totalCharacters / limit);
      offset = page >= tPage ? tPage * limit - limit : page * limit - limit;
      characters = await getCharacters(id, { limit, offset }, type);
    } else {
      characters = await getCharacters(id, { limit }, type);
    }
    res.send(characters);
  },
  async getComicsEvent(req, res) {
    let comics;
    const { id } = req.params;
    const q = req.query;
    console.log("entra");
    const limit = q.limit && q.limit >= 50 && q.limit <= 100 ? q.limit : 50;
    const page = q.page && q.page > 0 ? q.page : 1;
    const totalComics = isNaN(q.totalComics) ? false : q.totalComics;
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
  async getCreatorsEvent(req, res) {
    let creators;
    const { id } = req.params;
    const q = req.query;

    const limit = q.limit && q.limit >= 50 && q.limit <= 100 ? q.limit : 50;
    const page = q.page && q.page > 0 ? q.page : 1;
    const totalCreators = isNaN(q.totalCreators) ? false : q.totalCreators;
    let offset, tPage;
    if (totalCreators && page >= 2) {
      tPage = Math.ceil(totalCreators / limit);
      offset = page >= tPage ? tPage * limit - limit : page * limit - limit;
      creators = await getCreators(id, { limit, offset }, type);
    } else {
      creators = await getCreators(id, { limit }, type);
    }
    res.send(creators);
  },
  async getSeriesEvent(req, res) {
    let events;
    const { id } = req.params;
    const q = req.query;

    const limit = q.limit && q.limit >= 50 && q.limit <= 100 ? q.limit : 50;
    const page = q.page && q.page > 0 ? q.page : 1;
    const totalSeries = isNaN(q.totalSeries) ? false : q.totalSeries;
    let offset, tPage;
    if (totalSeries && page >= 2) {
      tPage = Math.ceil(totalSeries / limit);
      offset = page >= tPage ? tPage * limit - limit : page * limit - limit;
      events = await getSeries(id, { limit, offset }, type);
    } else {
      events = await getSeries(id, { limit }, type);
    }
    res.send(events);
  },
  async getStoriesEvent(req, res) {
    let stories;
    const { id } = req.params;
    const q = req.query;

    const limit = q.limit && q.limit >= 50 && q.limit <= 100 ? q.limit : 50;
    const page = q.page && q.page > 0 ? q.page : 1;
    const totalSeries = isNaN(q.totalSeries) ? false : q.totalSeries;
    let offset, tPage;
    if (totalSeries && page >= 2) {
      tPage = Math.ceil(totalSeries / limit);
      offset = page >= tPage ? tPage * limit - limit : page * limit - limit;
      stories = await getStories(id, { limit, offset }, type);
    } else {
      stories = await getStories(id, { limit }, type);
    }
    res.send(stories);
  },
};
