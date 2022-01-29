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
};
