const type = "creators";

const {
  getComics,
  getEvents,
  getSeries,
  getStories,
  getWithQuery,
  getById,
  getTotalPages,
  getSortQueries,
} = require("../utils");
const { getInfo, getListsOfDataFromAnId } = require("../newUtils");

module.exports = {
  async getAllCreators(req, res) {
    const q = req.query;
    const characters = await getInfo(type, q);
    res.send(characters).status(characters.success ? 200 : 400);
  },
  async getNewCreators(req, res) {
    try {
      const creators = await getWithQuery(
        { orderBy: "-modified", limit: 10 },
        type
      );
      res.send(creators);
    } catch (error) {
      res.send({ error: "An error has occurred", success: false }).status(500);
    }
  },
  async getCreatorById(req, res) {
    const { id } = req.params;
    let comics = { data: [], available: 0 },
      events = { data: [], available: 0 },
      series = { data: [], available: 0 },
      stories = { data: [], available: 0 };

    const creator = await getById(id, type);
    if (creator.success) {
      const data = creator.data;
      if (data.comics.available) {
        comics = await getComics(data.id, { limit: 10 }, type);
      }
      if (data.events.available) {
        events = await getEvents(data.id, { limit: 10 }, type);
      }
      if (data.series.available) {
        series = await getSeries(data.id, { limit: 10 }, type);
      }
      if (data.stories.available) {
        stories = await getStories(data.id, { limit: 10 }, type);
      }
      const creatorInfo = {
        id: data.id,
        fullname: data.fullName,
        img: data.thumbnail.path + "." + data.thumbnail.extension,
        comics,
        events,
        series,
        stories,
      };
      res.send({ ...creator, data: creatorInfo });
    } else {
      res.send(creator);
    }
  },
  async getComicsCreator(req, res) {
    const { id } = req.params;
    let dataType = "comics";
    const q = req.query;

    const data = await getListsOfDataFromAnId(id, type, q, dataType);

    res.send(data).status(data.success ? 200 : 400);
  },
  async getEventsCreator(req, res) {
    const { id } = req.params;
    let dataType = "events";
    const q = req.query;

    const data = await getListsOfDataFromAnId(id, type, q, dataType);

    res.send(data).status(data.success ? 200 : 400);
  },
  async getSeriesCreator(req, res) {
    const { id } = req.params;
    let dataType = "series";
    const q = req.query;

    const data = await getListsOfDataFromAnId(id, type, q, dataType);

    res.send(data).status(data.success ? 200 : 400);
  },
  async getStoriesCreator(req, res) {
    const { id } = req.params;
    let dataType = "stories";
    const q = req.query;

    const data = await getListsOfDataFromAnId(id, type, q, dataType);

    res.send(data).status(data.success ? 200 : 400);
  },
};
