const axios = require("axios");
const MARVEL_API = process.env.MARVEL_API;

module.exports = {
  async allStories(params = {}) {
    const limit = params.limit || 20;
    const offset = params.offset || 0;
    return axios
      .get(
        `https://gateway.marvel.com/v1/public/stories${MARVEL_API}&limit=${limit}&offset=${offset}`
      )
      .then(({ data }) => {
        const stories = data.data.results; // data request
        const results = stories.map((storie) => ({
          id: storie.id,
          title: storie.title,
          desc: storie.description,
          type: storie.type,
          totalCharacters: storie.characters.available,
          totalComics: storie.comics.available,
          totalCreators: storie.creators.available,
          totalEvents: storie.events.available,
          totalSeries: storie.series.available,
        }));
        return results;
      });
  },
  async newStories() {
    return axios
      .get(
        `https://gateway.marvel.com/v1/public/stories${MARVEL_API}&orderBy=-modified`
      )
      .then(({ data }) => {
        const stories = data.data.results; // data request
        const results = stories.map((storie) => ({
          id: storie.id,
          title: storie.title,
          desc: storie.description,
          type: storie.type,
        }));
        return results;
      });
  },
};
