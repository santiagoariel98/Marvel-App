const axios = require("axios");

const MARVEL_API = process.env.MARVEL_API;

module.exports = {
  newCharacters() {
    return axios
      .get(
        `https://gateway.marvel.com/v1/public/characters${MARVEL_API}&orderBy=-modified`
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
        return characters;
      });
  },
  allCharacters(params = {}) {
    const limit = params.limit || 20;
    const offset = params.offset || 0;
    return axios
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
        return characters;
      });
  },
  seriesCharacter(id, params = {}) {
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
  },
  storiesCharacter(id, params = {}) {
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
  },
  eventsCharacter(id, params = {}) {
    const limit = params.limit || 20;
    const offset = params.offset || 0;

    return axios
      .get(
        `https://gateway.marvel.com/v1/public/characters/${id}/events${MARVEL_API}&limit=${limit}&offset=${offset}`
      )
      .then(({ data }) => {
        const events = data.data.results;
        const available = data.data.total;
        const result = events.map((event) => ({
          id: event.id,
          title: event.title,
          desc: event.description,
          start: event.start,
          end: event.end,
          img: event.thumbnail.path + "." + event.thumbnail.extension,
        }));
        return { data: result, available };
      })
      .catch(() => ({ data: [], available: 0 }));
  },
  comicsCharacter(id, params = {}) {
    const limit = params.limit || 20;
    const offset = params.offset || 0;
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
  },
};
