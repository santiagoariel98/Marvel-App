const axios = require("axios");
const MARVEL_API = process.env.MARVEL_API;
const {
  allEvents,
  newEvents,
  comicsEvent,
  charactersEvent,
  creatorsEvent,
  seriesEvent,
  storiesEvent,
} = require("./utils");

module.exports = {
  async getAllEvents(req, res) {
    try {
      const q = req.query;
      const page = q.page && q.page > 0 ? q.page : 1; // min:1, max: n, default:1

      const limit = 20; // limit item per page
      const offset = page > 3 ? 60 : limit * page - limit; // 50921 total Comics
      const events = await allEvents({ limit, offset });
      console.log(limit, offset);
      res.send({ data: events, success: true });
    } catch (error) {
      res.send({ error: "An error has occurred", success: false }).status(500);
    }
  },
  async getNewEvents(req, res) {
    try {
      const q = req.query;
      const page = q.page && q.page > 0 ? q.page : 1; // min:1, max: n, default:1

      const limit = 20; // limit item per page
      const offset = page > 3 ? 60 : limit * page - limit; // 50921 total Comics
      const events = await newEvents();
      res.send({ data: events, success: true });
    } catch (error) {
      res.send({ error: "An error has occurred", success: false }).status(500);
    }
  },
  async getEventById(req, res) {
    const { id } = req.params;
    axios
      .get(`https://gateway.marvel.com/v1/public/events/${id}${MARVEL_API}`)
      .then(async ({ data }) => {
        data = data.data.results[0]; // data request
        let characters = { data: [], available: 0 },
          comics = { data: [], available: 0 },
          creators = { data: [], available: 0 },
          series = { data: [], available: 0 },
          stories = { data: [], available: 0 };

        if (data.characters.available) {
          characters = await charactersEvent(data.id);
        }
        if (data.comics.available) {
          comics = await comicsEvent(data.id);
        }
        if (data.creators.available) {
          creators = await creatorsEvent(data.id);
        }
        if (data.series.available) {
          series = await seriesEvent(data.id);
        }
        if (data.stories.available) {
          stories = await storiesEvent(data.id);
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
        res.send({
          data: eventInfo,
          success: true,
        });
      })
      .catch((err) => {
        console.log(err);
        res.send({ error: "Event not found", success: false }).status(404);
      });
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
      characters = await charactersEvent(id, { limit, offset });
    } else {
      characters = await charactersEvent(id, { limit });
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
      comics = await comicsEvent(id, { limit, offset });
    } else {
      comics = await comicsEvent(id, { limit });
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
      creators = await creatorsEvent(id, { limit, offset });
    } else {
      creators = await creatorsEvent(id, { limit });
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
      events = await seriesEvent(id, { limit, offset });
    } else {
      events = await seriesEvent(id, { limit });
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
      stories = await storiesEvent(id, { limit, offset });
    } else {
      stories = await storiesEvent(id, { limit });
    }
    res.send(stories);
  },
};
