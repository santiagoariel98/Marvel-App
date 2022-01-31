const type = "series";

const {
  getById,
  getWithQuery,
  getTotalPages,
  getCharacters,
  getEvents,
  getCreators,
  getStories,
  getComics,
  getSortQueries,
} = require("../utils");

module.exports = {
  async getAllSeries(req, res) {
    const q = req.query;
    const characters = await getInfo(type, q);
    res.send(characters).status(characters.success ? 200 : 400);
  },
  async getNewSeries(req, res) {
    try {
      const series = await getWithQuery(
        { orderBy: "-modified", limit: 10 },
        type
      );
      res.send(series);
    } catch (error) {
      console.log(error);
      res.send({ error: "An error has occurred", success: false }).status(500);
    }
  },

  async getSerieById(req, res) {
    const { id } = req.params;
    let characters = { data: [], available: 0 },
      comics = { data: [], available: 0 },
      creators = { data: [], available: 0 },
      stories = { data: [], available: 0 },
      events = { data: [], available: 0 };

    const serie = await getById(id, type);
    if (serie.success) {
      const data = serie.data;
      if (data.characters.available) {
        characters = await getCharacters(data.id, { limit: 10 }, type);
      }
      if (data.comics.available) {
        comics = await getComics(data.id, { limit: 10 }, type);
      }
      if (data.creators.available) {
        creators = await getCreators(data.id, { limit: 10 }, type);
      }
      if (data.stories.available) {
        stories = await getStories(data.id, { limit: 10 }, type);
      }
      if (data.events.available) {
        events = await getEvents(data.id, { limit: 10 }, type);
      }
      const characterInfo = {
        id: data.id,
        name: data.name,
        img: data.thumbnail.path + "." + data.thumbnail.extension,
        events,
        comics,
        characters,
        stories,
        creators,
      };
      res.send({ ...serie, data: characterInfo });
    } else {
      res.send(serie);
    }
  },
  async getComicsSerie(req, res) {
    const { id } = req.params;
    let dataType = "comics";
    const q = req.query;

    const data = await getListsOfDataFromAnId(id, type, q, dataType);

    res.send(data).status(data.success ? 200 : 400);
  },
  async getCharactersSerie(req, res) {
    const { id } = req.params;
    let dataType = "characters";
    const q = req.query;

    const data = await getListsOfDataFromAnId(id, type, q, dataType);

    res.send(data).status(data.success ? 200 : 400);
  },
  async getCreatorsSerie(req, res) {
    const { id } = req.params;
    let dataType = "creators";
    const q = req.query;

    const data = await getListsOfDataFromAnId(id, type, q, dataType);

    res.send(data).status(data.success ? 200 : 400);
  },
  async getEventsSerie(req, res) {
    const { id } = req.params;
    let dataType = "events";
    const q = req.query;

    const data = await getListsOfDataFromAnId(id, type, q, dataType);

    res.send(data).status(data.success ? 200 : 400);
  },

  async getStoriesSerie(req, res) {
    const { id } = req.params;
    let dataType = "stories";
    const q = req.query;

    const data = await getListsOfDataFromAnId(id, type, q, dataType);

    res.send(data).status(data.success ? 200 : 400);
  },
};
