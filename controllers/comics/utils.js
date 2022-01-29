const axios = require("axios");

const MARVEL_API = process.env.MARVEL_API;

module.exports = {
  async allComics(params = {}) {
    const limit = params.limit || 20;
    const offset = params.offset || 0;
    return axios
      .get(
        `https://gateway.marvel.com/v1/public/comics${MARVEL_API}&limit=${limit}&offset=${offset}`
      )
      .then(({ data }) => {
        comics = data.data.results; // data request
        const results = comics.map((comic) => ({
          id: comic.id,
          title: comic.title,
          img: comic.thumbnail.path + "." + comic.thumbnail.extension,
          totalEvents: comic.events.available,
          totalCreators: comic.creators.available,
          totalCharacters: comic.characters.available,
          totalSeries: comic.series.available,
        }));
        return results;
      });
  },
  async newComics() {
    return axios
      .get(
        `https://gateway.marvel.com/v1/public/comics${MARVEL_API}&orderBy=-modified`
      )
      .then(({ data }) => {
        comics = data.data.results; // data request
        const results = comics.map((comic) => ({
          id: comic.id,
          title: comic.title,
          img: comic.thumbnail.path + "." + comic.thumbnail.extension,
          onsale: comic.dates.filter((date) => date.type == "onsaleDate")[0],
          totalPage: comic.pageCount,
        }));
        return results;
      });
  },
};
