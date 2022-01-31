const type = "comics";

const {
  getCharacters,
  getCreators,
  getEvents,
  getStories,
  getWithQuery,
  getTotalPages,
  getById,
  getSortQueries,
} = require("../utils");
const { getListsOfDataFromAnId, getInfo } = require("../newUtils");
module.exports = {
  async getAllComics(req, res) {
    const q = req.query;
    const characters = await getInfo(type, q);
    res.send(characters).status(characters.success ? 200 : 400);
  },
  async getNewComics(req, res) {
    try {
      const comics = await getWithQuery(
        { orderBy: "-modified", limit: 10 },
        type
      );
      res.send(comics);
    } catch (error) {
      res.send({ error: "An error has occurred", success: false }).status(500);
    }
  },
  async getComicById(req, res) {
    const { id } = req.params;
    let characters = { data: [], available: 0 },
      creators = { data: [], available: 0 },
      events = { data: [], available: 0 },
      stories = { data: [], available: 0 };

    const comic = await getById(id, type);
    if (comic.success) {
      let data = comic.data;
      if (data.characters.available) {
        characters = await getCharacters(data.id, { limit: 10 }, type);
      }
      if (data.creators.available) {
        creators = await getCreators(data.id, { limit: 10 }, type);
      }
      if (data.events.available) {
        events = await getEvents(data.id, { limit: 10 }, type);
      }
      if (data.stories.available) {
        stories = await getStories(data.id, { limit: 10 }, type);
      }
      const comicInfo = {
        id: data.id,
        title: data.title,
        img: data.thumbnail.path + "." + data.thumbnail.extension,
        pageCount: data.pageCount,
        dates: data.dates.filter((date) => date.type === "onsaleDate")[0],
        characters,
        creators,
        events,
        stories,
      };
      res.send({ ...comic, data: comicInfo });
    } else {
      res.send(character);
    }
  },
  async getCharactersComic(req, res) {
    const { id } = req.params;
    let dataType = "characters";
    const q = req.query;

    const data = await getListsOfDataFromAnId(id, type, q, dataType);

    res.send(data).status(data.success ? 200 : 400);
  },
  async getCreatorsComic(req, res) {
    const { id } = req.params;
    let dataType = "creators";
    const q = req.query;

    const data = await getListsOfDataFromAnId(id, type, q, dataType);

    res.send(data).status(data.success ? 200 : 400);
  },
  async getEventsComic(req, res) {
    const { id } = req.params;
    let dataType = "events";
    const q = req.query;

    const data = await getListsOfDataFromAnId(id, type, q, dataType);

    res.send(data).status(data.success ? 200 : 400);
  },
  async getStoriesComic(req, res) {
    const { id } = req.params;
    let dataType = "stories";
    const q = req.query;

    const data = await getListsOfDataFromAnId(id, type, q, dataType);

    res.send(data).status(data.success ? 200 : 400);
  },
};
