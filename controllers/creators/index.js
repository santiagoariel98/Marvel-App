const type = "creators";

const {
  getComics,
  getEvents,
  getSeries,
  getStories,
  getWithQuery,
  getById,
  getTotalPages,
} = require("../utils");

module.exports = {
  async getAllCreators(req, res) {
    try {
      const q = req.query;
      const page = q.page > 2 ? q.page : 1;
      const limit = q.limit > 20 ? q.limit : 20;

      const total = +q.total || (await getTotalPages(limit, type));
      const offset =
        page > total ? total * limit - limit : page * limit - limit;

      const creators = await getWithQuery({ limit, offset }, type);
      res.send({ pages: total, page: offset / limit + 1, ...creators });
    } catch (error) {
      console.log(error);
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
        comics = await getComics(data.id, {}, type);
      }
      if (data.events.available) {
        events = await getEvents(data.id, {}, type);
      }
      if (data.series.available) {
        series = await getSeries(data.id, {}, type);
      }
      if (data.stories.available) {
        stories = await getStories(data.id, {}, type);
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
    let comics;
    const { id } = req.params;
    const q = req.query;

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
  async getEventsCreator(req, res) {
    let events;
    const { id } = req.params;
    const q = req.query;

    const limit = q.limit && q.limit >= 50 && q.limit <= 100 ? q.limit : 50;
    const page = q.page && q.page > 0 ? q.page : 1;
    const totalEvents = isNaN(q.totalEvents) ? false : q.totalEvents;
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
  async getSeriesCreator(req, res) {
    let series;
    const { id } = req.params;
    const q = req.query;

    const limit = q.limit && q.limit >= 50 && q.limit <= 100 ? q.limit : 50;
    const page = q.page && q.page > 0 ? q.page : 1;
    const totalSeries = isNaN(q.totalSeries) ? false : q.totalSeries;
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
  async getStoriesCreator(req, res) {
    let stories;
    const { id } = req.params;
    const q = req.query;

    const limit = q.limit && q.limit >= 50 && q.limit <= 100 ? q.limit : 50;
    const page = q.page && q.page > 0 ? q.page : 1;
    const totalStories = isNaN(q.totalStories) ? false : q.totalStories;
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
