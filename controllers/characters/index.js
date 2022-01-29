const axios = require("axios");
const {
  allCharacters,
  eventsCharacter,
  storiesCharacter,
  seriesCharacter,
  comicsCharacter,
  newCharacters,
} = require("./utils.js");

const MARVEL_API = process.env.MARVEL_API;

module.exports = {
  async getCharacters(req, res) {
    try {
      const q = req.query;
      const page = q.page && q.page > 0 ? q.page : 1; // min:1, max: n, default:1

      const limit = 20; // limit item per page
      const offset = page > 77 ? 1540 : limit * page - limit; // 1540 total Characters
      const characters = await allCharacters({ limit, offset });
      res.send({ data: characters, success: true });
    } catch (error) {
      res.send({ error: "An error has occurred", success: false }).status(500);
    }
  },
  async getNewCharacters(req, res) {
    try {
      const characters = await newCharacters();
      res.send({ data: characters, success: true });
    } catch (error) {
      res.send({ error: "An error has occurred", success: false }).status(500);
    }
  },

  getCharacterById(req, res) {
    const { id } = req.params;
    axios
      .get(`https://gateway.marvel.com/v1/public/characters/${id}${MARVEL_API}`)
      .then(async ({ data }) => {
        data = data.data.results[0]; // data request
        let events = { data: [], available: 0 },
          comics = { data: [], available: 0 },
          stories = { data: [], available: 0 },
          series = { data: [], available: 0 };

        if (data.events.available) {
          events = await eventsCharacter(data.id);
        }
        if (data.comics.available) {
          comics = await comicsCharacter(data.id);
        }
        if (data.stories.available) {
          stories = await storiesCharacter(data.id);
        }
        if (data.stories.available) {
          series = await seriesCharacter(data.id);
        }
        const characterInfo = {
          id: data.id,
          name: data.name,
          img: data.thumbnail.path + "." + data.thumbnail.extension,
          series,
          comics,
          events,
          stories,
        };

        res.send({
          data: characterInfo,
          success: true,
        });
      })
      .catch((err) => {
        res.send({ error: "Characters not found", success: false }).status(404);
      });
  },
  async getComicsCharacter(req, res) {
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
      comics = await comicsCharacter(id, { limit, offset });
    } else {
      comics = await comicsCharacter(id, { limit });
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
    // totalEvents = es: "eventos" en los que aparece el personaje.
    // totalEvents = en: events in which the character appears.

    let offset, tPage;
    // tPage = es: Total de "paginacion" que tiene los "eventos" de un personaje.
    // tPage = en: Total "pagination" of a character's "events".
    if (totalEvents && page >= 2) {
      tPage = Math.ceil(totalEvents / limit);
      offset = page >= tPage ? tPage * limit - limit : page * limit - limit;
      events = await eventsCharacter(id, { limit, offset });
    } else {
      events = await eventsCharacter(id, { limit });
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
    // totalSeries = es: "Series" en los que aparece el personaje.
    // totalSeries = en: Series in which the character appears.

    let offset, tPage;
    // tPage = es: Total de "paginacion" que tiene los "Series" de un personaje.
    // tPage = en: Total "pagination" of a character's "series".
    if (totalSeries && page >= 2) {
      tPage = Math.ceil(totalSeries / limit);
      offset = page >= tPage ? tPage * limit - limit : page * limit - limit;
      series = await seriesCharacter(id, { limit, offset });
    } else {
      series = await seriesCharacter(id, { limit });
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
    // totalStories = es: "Historias" en los que aparece el personaje.
    // totalStories = en: Stories in which the character appears.

    let offset, tPage;
    // tPage = es: Total de "paginacion" que tiene los "Historias" de un personaje.
    // tPage = en: Total "pagination" of a character's "Stories".
    if (totalStories && page >= 2) {
      tPage = Math.ceil(totalStories / limit);
      offset = page >= tPage ? tPage * limit - limit : page * limit - limit;
      stories = await storiesCharacter(id, { limit, offset });
    } else {
      stories = await storiesCharacter(id, { limit });
    }
    res.send(stories);
  },
};
