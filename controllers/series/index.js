const axios = require("axios");
const {
  allSeries,
  newSeries,
  comicsSerie,
  storiesSerie,
  creatorsSerie,
  charactersSerie,
  eventsSerie,
} = require("./utils.js");

const MARVEL_API = process.env.MARVEL_API;

module.exports = {
  async getAllSeries(req, res) {
    try {
      const q = req.query;
      const page = q.page && q.page > 0 ? q.page : 1; // min:1, max: n, default:1

      const limit = 20; // limit item per page
      const offset = page > 635 ? 12711 : limit * page - limit; // 1540 total Characters
      const series = await allSeries({ limit, offset });
      res.send({ data: series, success: true });
    } catch (error) {
      console.log(error);
      res.send({ error: "An error has occurred", success: false }).status(500);
    }
  },
  async getNewSeries(req, res) {
    try {
      const characters = await newSeries();
      res.send({ data: characters, success: true });
    } catch (error) {
      console.log(error);
      res.send({ error: "An error has occurred", success: false }).status(500);
    }
  },

  getSerieById(req, res) {
    const { id } = req.params;
    axios
      .get(`https://gateway.marvel.com/v1/public/series/${id}${MARVEL_API}`)
      .then(async ({ data }) => {
        data = data.data.results[0]; // data request
        let characters = { data: [], available: 0 },
          comics = { data: [], available: 0 },
          creators = { data: [], available: 0 },
          stories = { data: [], available: 0 },
          events = { data: [], available: 0 };

        if (data.characters.available) {
          characters = await charactersSerie(data.id);
        }
        if (data.comics.available) {
          comics = await comicsSerie(data.id);
        }
        if (data.creators.available) {
          creators = await creatorsSerie(data.id);
        }
        if (data.stories.available) {
          stories = await storiesSerie(data.id);
        }
        if (data.events.available) {
          events = await eventsSerie(data.id);
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

        res.send({
          data: characterInfo,
          success: true,
        });
      })
      .catch((err) => {
        res.send({ error: "Characters not found", success: false }).status(404);
      });
  },
  async getComicsSerie(req, res) {
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
      comics = await comicsSerie(id, { limit, offset });
    } else {
      comics = await comicsSerie(id, { limit });
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
      comics = await charactersSerie(id, { limit, offset });
    } else {
      comics = await charactersSerie(id, { limit });
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
      events = await creatorsSerie(id, { limit, offset });
    } else {
      events = await creatorsSerie(id, { limit });
    }
    res.send(events);
  },
  async getEventsSerie(req, res) {
    const { id } = req.params; // ID Personaje/Characters
    const q = req.query;
    let series;
    const limit = q.limit && q.limit >= 50 && q.limit <= 100 ? q.limit : 50; // min: 50, max: 100, default: 50
    const page = q.page && q.page > 0 ? q.page : 1; // min:1, max: n, default:1
    const totalEvents = isNaN(q.totalEvents) ? "" : q.totalEvents; // min: 1, default: false
    // totalEvents = es: "Series" en los que aparece el personaje.
    // totalEvents = en: Series in which the character appears.

    let offset, tPage;
    // tPage = es: Total de "paginacion" que tiene los "Series" de un personaje.
    // tPage = en: Total "pagination" of a character's "series".
    if (totalEvents && page >= 2) {
      tPage = Math.ceil(totalEvents / limit);
      offset = page >= tPage ? tPage * limit - limit : page * limit - limit;
      series = await eventsSerie(id, { limit, offset });
    } else {
      series = await eventsSerie(id, { limit });
    }
    res.send(series);
  },

  async getStoriesSerie(req, res) {
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
      stories = await storiesSerie(id, { limit, offset });
    } else {
      stories = await storiesSerie(id, { limit });
    }
    res.send(stories);
  },
};
