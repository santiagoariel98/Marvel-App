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
};
