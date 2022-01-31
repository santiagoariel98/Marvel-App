const type = "events";

const {
  getComics,
  getCharacters,
  getCreators,
  getSeries,
  getStories,
  getWithQuery,
  getTotalPages,
  getById,
  getSortQueries,
} = require("../utils");
const { getListsOfDataFromAnId, getInfoById, getInfo } = require("../newUtils");

module.exports = {
  async getAllEvents(req, res) {
    const q = req.query;
    const characters = await getInfo(type, q);
    res.send(characters).status(characters.success ? 200 : 400);
  },
  async getNewEvents(req, res) {
    try {
      const events = await getWithQuery(
        { orderBy: "-modified", limit: 10 },
        type
      );
      res.send(events);
    } catch (error) {
      res.send({ error: "An error has occurred", success: false }).status(500);
    }
  },
  async getEventById(req, res) {
    const { id } = req.params;
    let characters = { data: [], available: 0 },
      comics = { data: [], available: 0 },
      creators = { data: [], available: 0 },
      series = { data: [], available: 0 },
      stories = { data: [], available: 0 };
    const events = await getById(id, type);

    if (events.success) {
      const data = events.data;
      if (data.characters.available) {
        characters = await getCharacters(data.id, { limit: 10 }, type);
      }
      if (data.comics.available) {
        comics = await getComics(data.id, { limit: 10 }, type);
      }
      if (data.creators.available) {
        creators = await getCreators(data.id, { limit: 10 }, type);
      }
      if (data.series.available) {
        series = await getSeries(data.id, { limit: 10 }, type);
      }
      if (data.stories.available) {
        stories = await getStories(data.id, { limit: 10 }, type);
      }
      const eventInfo = {
        id: data.id,
        title: data.title,
        startAndEnd: {
          start: data.start,
          end: data.end,
        },
        next: data.next.name,
        previous: data.previous.name,
        desc: data.description,
        characters,
        comics,
        creators,
        stories,
      };
      res.send({ ...events, data: eventInfo });
    } else {
      res.send(events).status(400);
    }
  },
  async getCharactersEvent(req, res) {
    const { id } = req.params;
    let dataType = "characters";
    const q = req.query;

    const data = await getListsOfDataFromAnId(id, type, q, dataType);

    res.send(data).status(data.success ? 200 : 400);
  },
  async getComicsEvent(req, res) {
    const { id } = req.params;
    let dataType = "comics";
    const q = req.query;

    const data = await getListsOfDataFromAnId(id, type, q, dataType);

    res.send(data).status(data.success ? 200 : 400);
  },
  async getCreatorsEvent(req, res) {
    const { id } = req.params;
    let dataType = "creators";
    const q = req.query;

    const data = await getListsOfDataFromAnId(id, type, q, dataType);

    res.send(data).status(data.success ? 200 : 400);
  },
  async getSeriesEvent(req, res) {
    const { id } = req.params;
    let dataType = "series";
    const q = req.query;

    const data = await getListsOfDataFromAnId(id, type, q, dataType);

    res.send(data).status(data.success ? 200 : 400);
  },
  async getStoriesEvent(req, res) {
    const { id } = req.params;
    let dataType = "stories";
    const q = req.query;

    const data = await getListsOfDataFromAnId(id, type, q, dataType);

    res.send(data).status(data.success ? 200 : 400);
  },
};
