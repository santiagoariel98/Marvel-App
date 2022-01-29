const axios = require("axios");

const MARVEL_API = process.env.MARVEL_API;

module.exports = {
  async allSeries(params = {}) {
    const limit = params.limit || 20;
    const offset = params.offset || 0;
    return axios
      .get(
        `https://gateway.marvel.com/v1/public/series${MARVEL_API}&limit=${limit}&offset=${offset}`
      )
      .then(({ data }) => {
        const series = data.data.results; // data request
        const results = series.map((serie) => ({
          id: serie.id,
          title: serie.title,
          startYear: serie.startYear,
          desc: serie.description,
          type: serie.type,
          img: serie.thumbnail.path + "." + serie.thumbnail.extension,
          totalCharacters: serie.characters.available,
          totalComics: serie.comics.available,
          totalCreators: serie.creators.available,
          totalEvents: serie.events.available,
          totalStories: serie.stories.available,
        }));
        return results;
      });
  },
  async newSeries() {
    return axios
      .get(
        `https://gateway.marvel.com/v1/public/series${MARVEL_API}&orderBy=-modified`
      )
      .then(({ data }) => {
        const series = data.data.results; // data request
        const results = series.map((serie) => ({
          id: serie.id,
          title: serie.title,
          desc: serie.description,
          startYear: serie.startYear,
          type: serie.type,
          img: serie.thumbnail.path + "." + serie.thumbnail.extension,
        }));
        return results;
      });
  },
  charactersSerie(id, params = {}) {
    const limit = params.limit || 20;
    const offset = params.offset || 0;
    return axios
      .get(
        `https://gateway.marvel.com/v1/public/series/${id}/characters${MARVEL_API}&limit=${limit}&offset=${offset}`
      )
      .then(({ data }) => {
        const characters = data.data.results;
        const available = data.data.total;
        const result = characters.map((character) => ({
          id: character.id,
          name: character.name,
          desc: character.description,
          img: character.thumbnail.path + "." + character.thumbnail.extension,
        }));
        return { data: result, available };
      })
      .catch(() => ({ data: [], available: 0 }));
  },
  comicsSerie(id, params = {}) {
    const limit = params.limit || 20;
    const offset = params.offset || 0;
    return axios
      .get(
        `https://gateway.marvel.com/v1/public/series/${id}/comics${MARVEL_API}&limit=${limit}&offset=${offset}`
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
  creatorsSerie(id, params = {}) {
    const limit = params.limit || 20;
    const offset = params.offset || 0;
    return axios
      .get(
        `https://gateway.marvel.com/v1/public/series/${id}/creators${MARVEL_API}&limit=${limit}&offset=${offset}`
      )
      .then(({ data }) => {
        const creators = data.data.results;
        const available = data.data.total;
        const result = creators.map((creator) => ({
          id: creator.id,
          fullname: creator.fullName,
          img: creator.thumbnail.path + "." + creator.thumbnail.extension,
        }));

        return { data: result, available };
      })
      .catch(() => ({ data: [], available: 0 }));
  },
  eventsSerie(id, params = {}) {
    const limit = params.limit || 20;
    const offset = params.offset || 0;

    return axios
      .get(
        `https://gateway.marvel.com/v1/public/series/${id}/events${MARVEL_API}&limit=${limit}&offset=${offset}`
      )
      .then(({ data }) => {
        const events = data.data.results;
        const available = data.data.total;
        const result = events.map((event) => ({
          id: event.id,
          title: event.title,
          img: event.thumbnail.path + "." + event.thumbnail.extension,
          desc: event.description,
        }));
        return { data: result, available };
      })
      .catch(() => ({ data: [], available: 0 }));
  },

  storiesSerie(id, params = {}) {
    const limit = params.limit || 20;
    const offset = params.offset || 0;
    return axios
      .get(
        `https://gateway.marvel.com/v1/public/series/${id}/stories${MARVEL_API}&limit=${limit}&offset=${offset}`
      )
      .then(({ data }) => {
        const stories = data.data.results;
        const available = data.data.total;
        const result = stories.map((storie) => ({
          id: storie.id,
          type: storie.type,
          title: storie.title,
          desc: storie.description,
        }));
        return { data: result, available };
      })
      .catch(() => ({ data: [], available: 0 }));
  },
};
