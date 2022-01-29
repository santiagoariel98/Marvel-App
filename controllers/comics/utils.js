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
  charactersComic(id, params = {}) {
    const limit = params.limit || 20;
    const offset = params.offset || 0;
    return axios
      .get(
        `https://gateway.marvel.com/v1/public/comics/${id}/characters${MARVEL_API}&limit=${limit}&offset=${offset}`
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
  creatorsComic(id, params = {}) {
    const limit = params.limit || 20;
    const offset = params.offset || 0;
    return axios
      .get(
        `https://gateway.marvel.com/v1/public/comics/${id}/creators${MARVEL_API}&limit=${limit}&offset=${offset}`
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
  eventsComic(id, params = {}) {
    const limit = params.limit || 20;
    const offset = params.offset || 0;

    return axios
      .get(
        `https://gateway.marvel.com/v1/public/comics/${id}/events${MARVEL_API}&limit=${limit}&offset=${offset}`
      )
      .then(({ data }) => {
        console.log(data);
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
  storiesComic(id, params = {}) {
    const limit = params.limit || 20;
    const offset = params.offset || 0;
    return axios
      .get(
        `https://gateway.marvel.com/v1/public/comics/${id}/stories${MARVEL_API}&limit=${limit}&offset=${offset}`
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
