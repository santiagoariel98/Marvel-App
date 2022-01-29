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
};
