const axios = require("axios");

const MARVEL_API = process.env.MARVEL_API;

const validateQuery = (arr = [], string = "") => {
  return arr.some((e) => e == string);
};
const convertData = (data, type) => {
  if (type === "characters") {
    return data.map((character) => ({
      id: character.id,
      name: character.name,
      img: character.thumbnail.path + "." + character.thumbnail.extension,
      totalComics: character.comics.available,
      totalEvents: character.events.available,
      totalSeries: character.series.available,
      totalStories: character.stories.available,
    }));
  } else if (type === "comics") {
    return data.map((comic) => ({
      id: comic.id,
      title: comic.title,
      img: comic.thumbnail.path + "." + comic.thumbnail.extension,
      desc: comic.description,
      totalCharacters: comic.characters.available,
      totalCreators: comic.creators.available,
      totalEvents: comic.events.available,
      totalStories: comic.stories.available,
    }));
  } else if (type === "creators") {
    return data.map((creator) => ({
      id: creator.id,
      fullname: creator.fullName,
      img: creator.thumbnail.path + "." + creator.thumbnail.extension,
      totalComics: creator.comics.available,
      totalEvents: creator.events.available,
      totalSeries: creator.series.available,
      totalStories: creator.stories.available,
    }));
  } else if (type === "events") {
    return data.map((event) => ({
      id: event.id,
      desc: event.description,
      title: event.title,
      img: event.thumbnail.path + "." + event.thumbnail.extension,
      totalCharacters: event.characters.available,
      totalComics: event.comics.available,
      totalCreators: event.creators.available,
      totalSeries: event.series.available,
      totalStories: event.stories.available,
    }));
  } else if (type === "series") {
    return data.map((serie) => ({
      id: serie.id,
      desc: serie.description,
      rating: serie.rating,
      type: serie.type,
      startYear: serie.startYear,
      title: serie.title,
      endYear: serie.endYear,
      img: serie.thumbnail.path + "." + serie.thumbnail.extension,
      totalCharacters: serie.characters.available,
      totalComics: serie.comics.available,
      totalCreators: serie.creators.available,
      totalEvents: serie.events.available,
      totalStories: serie.stories.available,
    }));
  } else if (type === "stories") {
    return data.map((storie) => ({
      id: storie.id,
      desc: storie.desc,
      title: storie.title,
      type: storie.type,
      totalCharacters: storie.characters.available,
      totalComics: storie.comics.available,
      totalCreators: storie.creators.available,
      totalEvents: storie.events.available,
      totalSeries: storie.series.available,
    }));
  }
};

module.exports = {
  getCharacters(id, params = {}, type) {
    const limit = params.limit || 20;
    const offset = params.offset || 0;
    return axios
      .get(
        `https://gateway.marvel.com/v1/public/${type}/${id}/characters${MARVEL_API}&limit=${limit}&offset=${offset}`
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
  getComics(id, params = {}, type) {
    const limit = params.limit || 20;
    const offset = params.offset || 0;
    return axios
      .get(
        `https://gateway.marvel.com/v1/public/${type}/${id}/comics${MARVEL_API}&limit=${limit}&offset=${offset}`
      )
      .then(({ data }) => {
        const comics = data.data.results;
        const available = data.data.total;
        const result = comics.map((comic) => ({
          id: comic.id,
          dates: comic.dates.filter((date) => date.type === "onsaleDate")[0],
          format: comic.format,
          img: comic.thumbnail.path + "." + comic.thumbnail.extension,
          title: comic.title,
        }));
        return { data: result, available };
      })
      .catch(() => ({ data: [], available: 0 }));
  },
  getCreators(id, params = {}, type) {
    const limit = params.limit || 20;
    const offset = params.offset || 0;
    return axios
      .get(
        `https://gateway.marvel.com/v1/public/${type}/${id}/creators${MARVEL_API}&limit=${limit}&offset=${offset}`
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
  getEvents(id, params = {}, type) {
    const limit = params.limit || 20;
    const offset = params.offset || 0;

    return axios
      .get(
        `https://gateway.marvel.com/v1/public/${type}/${id}/events${MARVEL_API}&limit=${limit}&offset=${offset}`
      )
      .then(({ data }) => {
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

  getStories(id, params = {}, type) {
    const limit = params.limit || 20;
    const offset = params.offset || 0;
    return axios
      .get(
        `https://gateway.marvel.com/v1/public/${type}/${id}/stories${MARVEL_API}&limit=${limit}&offset=${offset}`
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
  getSeries(id, params = {}, type) {
    const limit = params.limit || 20;
    const offset = params.offset || 0;
    return axios
      .get(
        `https://gateway.marvel.com/v1/public/${type}/${id}/series${MARVEL_API}&limit=${limit}&offset=${offset}`
      )
      .then(({ data }) => {
        const series = data.data.results;
        const available = data.data.total;
        const result = series.map((serie) => ({
          id: serie.id,
          title: serie.title,
          type: serie.type,
          img: serie.thumbnail.path + "." + serie.thumbnail.extension,
        }));
        return { data: result, available };
      })
      .catch(() => ({ data: [], available: 0 }));
  },

  getById(id, type) {
    return axios
      .get(`https://gateway.marvel.com/v1/public/${type}/${id}${MARVEL_API}`)
      .then(({ data }) => ({ success: true, data: data.data.results[0] }))
      .catch(() => ({
        success: false,
        error: `${type.slice(0, -1)} not found`,
      }));
  },
  getWithQuery(options = {}, type) {
    const queries = Object.entries(options)
      .map((params) => params.join("="))
      .join("&");
    return axios
      .get(
        `https://gateway.marvel.com/v1/public/${type}${MARVEL_API}&${queries}`
      )
      .then(({ data }) => {
        data = data.data.results;
        const result = convertData(data, type);

        return { success: true, data: result };
      })
      .catch(() => ({
        success: false,
        error: `${type.slice(0, -1)} not found`,
      }));
  },
  async getTotalPages(limit = 20, type) {
    return axios
      .get(`https://gateway.marvel.com/v1/public/${type}${MARVEL_API}&limit=1`)
      .then(({ data }) => {
        const items = data.data.total; // total items
        const pages = items / limit > 1 ? Math.ceil(items / limit) : 1;
        return pages;
      })
      .catch(() => 1);
  },
  getSortQueries(type, sort = "") {
    let orderBy = "modified";
    if (type === "characters") {
      let valid = ["-name", "name", "modified", "-modified"];
      orderBy = validateQuery(valid, sort) ? sort : "name";
    } else if (type === "comics") {
      let valid = ["onsaleDate", "-onsaleDate", "title", "-title"];
      orderBy = validateQuery(valid, sort) ? sort : "title";
    } else if (type === "creators") {
      let valid = [
        "-lastName",
        "lastName",
        "-firstName",
        "firstName",
        "modified",
        "-modified",
      ];
      orderBy = validateQuery(valid, sort) ? sort : "firstname";
    } else if (type === "events") {
      let valid = ["name", "-name", "startDate", "-startDate"];
      orderBy = validateQuery(valid, sort) ? sort : "name";
    } else if (type === "series") {
      let valid = ["startYear", "-startYear", "title", "-title"];
      orderBy = validateQuery(valid, sort) ? sort : "title";
    } else if (type === "stories") {
      let valid = ["modified", "-modified"];
      orderBy = validateQuery(valid, sort) ? sort : "modified";
    }

    return orderBy;
  },
};
