const axios = require("axios");
const MARVEL_API = process.env.MARVEL_API;
const { newCreators, allCreators } = require("./utils");

const type = "creators";
const { getComics, getEvents, getSeries, getStories } = require("../utils");

module.exports = {
  async getAllCreators(req, res) {
    try {
      const q = req.query;
      const page = q.page && q.page > 0 ? q.page : 1; // min:1, max: n, default:1

      const limit = 20; // limit item per page
      const offset = page > 282 ? 5651 : limit * page - limit; // 5651 total creators
      const creators = await allCreators({ limit, offset });
      res.send({ data: creators, success: true });
    } catch (error) {
      res.send({ error: "An error has occurred", success: false }).status(500);
    }
  },
  async getNewCreators(req, res) {
    try {
      const q = req.query;
      const page = q.page && q.page > 0 ? q.page : 1; // min:1, max: n, default:1

      const limit = 20; // limit item per page
      const offset = page > 282 ? 5651 : limit * page - limit; // 5651 total creators
      const creators = await newCreators();
      res.send({ data: creators, success: true });
    } catch (error) {
      res.send({ error: "An error has occurred", success: false }).status(500);
    }
  },
  async getCreatorById(req, res) {
    const { id } = req.params;
    axios
      .get(`https://gateway.marvel.com/v1/public/creators/${id}${MARVEL_API}`)
      .then(async ({ data }) => {
        data = data.data.results[0]; // data request
        let comics = { data: [], available: 0 },
          events = { data: [], available: 0 },
          series = { data: [], available: 0 },
          stories = { data: [], available: 0 };

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
        res.send({
          data: creatorInfo,
          success: true,
        });
      })
      .catch((err) => {
        res.send({ error: "Creator not found", success: false }).status(404);
      });
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
