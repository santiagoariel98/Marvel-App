const axios = require("axios");
const MARVEL_API = process.env.MARVEL_API;
const {
  charactersComic,
  creatorsComic,
  eventsComic,
  storiesComic,
  newComics,
  allComics,
} = require("./utils");

module.exports = {
  async getAllComics(req, res) {
    try {
      const q = req.query;
      const page = q.page && q.page > 0 ? q.page : 1; // min:1, max: n, default:1

      const limit = 20; // limit item per page
      const offset = page > 2546 ? 50920 : limit * page - limit; // 50921 total Comics
      const characters = await allComics({ limit, offset });
      console.log(limit, offset);
      res.send({ data: characters, success: true });
    } catch (error) {
      res.send({ error: "An error has occurred", success: false }).status(500);
    }
  },
  async getNewComics(req, res) {
    try {
      const q = req.query;
      const page = q.page && q.page > 0 ? q.page : 1; // min:1, max: n, default:1

      const limit = 20; // limit item per page
      const offset = page > 2546 ? 50920 : limit * page - limit; // 50921 total Comics
      const comics = await newComics();
      res.send({ data: comics, success: true });
    } catch (error) {
      res.send({ error: "An error has occurred", success: false }).status(500);
    }
  },
  async getComicById(req, res) {
    const { id } = req.params;
    axios
      .get(`https://gateway.marvel.com/v1/public/comics/${id}${MARVEL_API}`)
      .then(async ({ data }) => {
        data = data.data.results[0]; // data request
        let characters = { data: [], available: 0 },
          creators = { data: [], available: 0 },
          events = { data: [], available: 0 },
          stories = { data: [], available: 0 };

        if (data.characters.available) {
          characters = await charactersComic(data.id);
        }
        if (data.creators.available) {
          creators = await creatorsComic(data.id);
        }
        if (data.events.available) {
          events = await eventsComic(data.id);
        }
        if (data.stories.available) {
          stories = await storiesComic(data.id);
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
        res.send({
          data: comicInfo,
          success: true,
        });
      })
      .catch((err) => {
        res.send({ error: "Comic not found", success: false }).status(404);
      });
  },
  async getCharactersComic(req, res) {
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
      characters = await charactersComic(id, { limit, offset });
    } else {
      characters = await charactersComic(id, { limit });
    }
    res.send(characters);
  },
  async getCreatorsComic(req, res) {
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
      creators = await creatorsComic(id, { limit, offset });
    } else {
      creators = await creatorsComic(id, { limit });
    }
    res.send(creators);
  },
  async getEventsComic(req, res) {
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
      events = await eventsComic(id, { limit, offset });
    } else {
      events = await eventsComic(id, { limit });
    }
    res.send(events);
  },
  async getStoriesComic(req, res) {
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
      stories = await storiesComic(id, { limit, offset });
    } else {
      stories = await storiesComic(id, { limit });
    }
    res.send(stories);
  },
};
