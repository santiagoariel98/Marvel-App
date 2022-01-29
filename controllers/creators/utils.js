const axios = require("axios");

const MARVEL_API = process.env.MARVEL_API;

module.exports = {
  async allCreators(params = {}) {
    const limit = params.limit || 20;
    const offset = params.offset || 0;
    return axios
      .get(
        `https://gateway.marvel.com/v1/public/creators${MARVEL_API}&limit=${limit}&offset=${offset}`
      )
      .then(({ data }) => {
        const creators = data.data.results; // data request
        const results = creators.map((creator) => ({
          id: creator.id,
          fullname: creator.fullName,
          img: creator.thumbnail.path + "." + creator.thumbnail.extension,
          totalComics: creator.comics.available,
          totalEvents: creator.events.available,
          totalSeries: creator.series.available,
          totalStories: creator.stories.available,
        }));
        return results;
      });
  },
  async newCreators() {
    return axios
      .get(
        `https://gateway.marvel.com/v1/public/creators${MARVEL_API}&orderBy=-modified`
      )
      .then(({ data }) => {
        const creators = data.data.results; // data request
        const results = creators.map((creator) => ({
          id: creator.id,
          fullname: creator.fullName,
          img: creator.thumbnail.path + "." + creator.thumbnail.extension,
        }));
        return results;
      });
  },
  comicsCreator(id, params = {}) {
    const limit = params.limit || 20;
    const offset = params.offset || 0;
    return axios
      .get(
        `https://gateway.marvel.com/v1/public/creators/${id}/comics${MARVEL_API}&limit=${limit}&offset=${offset}`
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
  eventsCreator(id, params = {}) {
    const limit = params.limit || 20;
    const offset = params.offset || 0;
    return axios
      .get(
        `https://gateway.marvel.com/v1/public/creators/${id}/events${MARVEL_API}&limit=${limit}&offset=${offset}`
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
  seriesCreator(id, params = {}) {
    const limit = params.limit || 20;
    const offset = params.offset || 0;

    return axios
      .get(
        `https://gateway.marvel.com/v1/public/creators/${id}/series${MARVEL_API}&limit=${limit}&offset=${offset}`
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
  storiesCreator(id, params = {}) {
    const limit = params.limit || 20;
    const offset = params.offset || 0;
    return axios
      .get(
        `https://gateway.marvel.com/v1/public/creators/${id}/stories${MARVEL_API}&limit=${limit}&offset=${offset}`
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
