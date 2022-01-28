const axios = require("axios");
const { param } = require("express/lib/request");

const MARVEL_API = process.env.MARVEL_API;
const getSeries = (id, params = {}) => {
  const limit = params.limit || 20;
  const offset = params.offset || 0;
  return axios
    .get(
      `https://gateway.marvel.com/v1/public/characters/${id}/series${MARVEL_API}&limit=${limit}&offset=${offset}`
    )
    .then(({ data }) => {
      const series = data.data.results;
      const available = data.data.total;
      const result = series.map((serie) => ({
        id: serie.id,
        title: serie.title,
        type: serie.type,
        img: serie.thumbnail.path + "." + serie.thumbnail.extension,
      }));
      return { data: result, available };
    })
    .catch(() => ({ data: [], available: 0 }));
};
const getStories = (id, params = {}) => {
  const limit = params.limit || 20;
  const offset = params.offset || 0;
  return axios
    .get(
      `https://gateway.marvel.com/v1/public/characters/${id}/stories${MARVEL_API}&limit=${limit}&offset=${offset}`
    )
    .then(({ data }) => {
      const stories = data.data.results;
      const available = data.data.total;
      const result = stories.map((storie) => ({
        id: storie.id,
        title: storie.title,
        desc: storie.description,
        type: storie.type,
        originalIssue: storie.originalIssue?.name,
      }));

      return { data: result, available };
    })
    .catch(() => ({ data: [], available: 0 }));
};
const getEvents = (id, params = {}) => {
  const limit = params.limit || 20;
  const offset = params.limit || 0;

  return axios
    .get(
      `https://gateway.marvel.com/v1/public/characters/${id}/events${MARVEL_API}&limit=${limit}&offset=${offset}`
    )
    .then(({ data }) => {
      const events = data.data.results;
      const available = data.data.total;
      const result = events.map((event) => ({
        id: event.id,
        prices: event.prices,
        img: event.thumbnail.path + "." + event.thumbnail.extension,
        title: event.title,
      }));
      return { data: result, available };
    })
    .catch(() => ({ data: [], available: 0 }));
};
const getComics = (id, params = {}) => {
  const limit = params.limit || 20;
  const offset = params.offset || 0;
  console.log(limit, offset);
  return axios
    .get(
      `https://gateway.marvel.com/v1/public/characters/${id}/comics${MARVEL_API}&limit=${limit}&offset=${offset}`
    )
    .then(({ data }) => {
      const comics = data.data.results;
      const available = data.data.total;
      const result = comics.map((comic) => ({
        id: comic.id,
        dates: comic.dates.filter((date) => date.type === "onsaleDate")[0],
        format: comic.format,
        img: comic.thumbnail.path + "." + comic.thumbnail.extension,
        title: comic.title,
      }));
      return { data: result, available };
    })
    .catch(() => ({ data: [], available: 0 }));
};
module.exports = {
  getCharacters(req, res) {
    try {
      const q = req.query;
      const page = q.page && q.page > 0 ? q.page : 1; // min:1, max: n, default:1
      if (isNaN(page)) {
        throw Error(`Error ${page} is not a number`);
      }
      const limit = 20; // limit item per page
      const offset = page > 77 ? 1540 : limit * page - limit; // 1540 total Characters
      axios
        .get(
          `https://gateway.marvel.com/v1/public/characters${MARVEL_API}&limit=${limit}&offset=${offset}`
        )
        .then(({ data }) => {
          data = data.data.results; // data request
          const characters = data.map((character) => ({
            id: character.id,
            name: character.name,
            comicsTotal: character.comics.available,
            img: character.thumbnail.path + "." + character.thumbnail.extension,
            seriesTotal: character.series.available,
            storiesTotal: character.stories.available,
            eventsTotal: character.events.available,
          }));

          res.send({ data: characters, success: true });
        });
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
          events = await getEvents(data.id);
        }
        if (data.comics.available) {
          comics = await getComics(data.id);
        }
        if (data.stories.available) {
          stories = await getStories(data.id);
        }
        if (data.stories.available) {
          series = await getSeries(data.id);
        }
        const characterInfo = {
          id: data.id,
          name: data.name,
          img: data.thumbnail.path + "." + data.thumbnail.extension,
        };

        res.send({
          ...characterInfo,
          series,
          comics,
          events,
          stories,
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
      comics = await getComics(id, { limit, offset });
    } else {
      comics = await getComics(id, { limit });
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
      events = await getEvents(id, { limit, offset });
    } else {
      events = await getEvents(id, { limit });
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
      series = await getSeries(id, { limit, offset });
    } else {
      series = await getSeries(id, { limit });
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
      stories = await getStories(id, { limit, offset });
    } else {
      stories = await getStories(id, { limit });
    }
    res.send(stories);
  },
};
