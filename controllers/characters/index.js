const type = "characters";

const {
  getCharacters,
  getComics,
  getEvents,
  getSeries,
  getStories,
  getById,
  getWithQuery,
  getTotalPages,
} = require("../utils.js");
const { getInfo, getListsOfDataFromAnId } = require("../newUtils");

module.exports = {
  async getCharacters(req, res) {
    const q = req.query;
    const characters = await getInfo(type, q);
    res.send(characters).status(characters.success ? 200 : 400);
  },
  async getCharacterById(req, res) {
    const { id } = req.params;

    let events = { data: [], available: 0 },
      comics = { data: [], available: 0 },
      stories = { data: [], available: 0 },
      series = { data: [], available: 0 };

    const character = await getById(id, type);
    if (character.success) {
      let data = character.data;
      if (data.events.available) {
        events = await getEvents(id, { limit: 10 }, type);
      }
      if (data.comics.available) {
        comics = await getComics(id, { limit: 10 }, type);
      }
      if (data.stories.available) {
        stories = await getCharacters(id, { limit: 10 }, type);
      }
      if (data.stories.available) {
        series = await getSeries(id, { limit: 10 }, type);
      }
      const characterInfo = {
        id: id,
        name: data.name,
        img: data.thumbnail.path + "." + data.thumbnail.extension,
        series,
        comics,
        events,
        stories,
      };
      res.send({ ...character, data: characterInfo });
    } else {
      res.send(character);
    }
  },
  async getComicsCharacter(req, res) {
    const { id } = req.params;
    let dataType = "comics";
    const q = req.query;

    const data = await getListsOfDataFromAnId(id, type, q, dataType);

    res.send(data).status(data.success ? 200 : 400);
  },
  async getEventsCharacter(req, res) {
    const { id } = req.params;
    let dataType = "events";
    const q = req.query;

    const data = await getListsOfDataFromAnId(id, type, q, dataType);

    res.send(data).status(data.success ? 200 : 400);
  },
  async getSeriesCharacter(req, res) {
    const { id } = req.params;
    let dataType = "series";
    const q = req.query;

    const data = await getListsOfDataFromAnId(id, type, q, dataType);

    res.send(data).status(data.success ? 200 : 400);
  },

  async getStoriesCharacter(req, res) {
    const { id } = req.params;
    let dataType = "stories";
    const q = req.query;

    const data = await getListsOfDataFromAnId(id, type, q, dataType);

    res.send(data).status(data.success ? 200 : 400);
  },
};
