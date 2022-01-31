const axios = require("axios");
const MARVEL_API = process.env.MARVEL_API;

const convertData = (data, dataType) => {
  if (dataType === "characters") {
    return data.map((character) => ({
      id: character.id,
      name: character.name,
      img: character.thumbnail.path + "." + character.thumbnail.extension,
      totalComics: character.comics.available,
      totalEvents: character.events.available,
      totalSeries: character.series.available,
      totalStories: character.stories.available,
    }));
  } else if (dataType === "comics") {
    return data.map((comic) => ({
      id: comic.id,
      title: comic.title,
      img: comic.thumbnail.path + "." + comic.thumbnail.extension,
      desc: comic.description,
      onsale: comic.dates.filter((date) => date.type === "onsaleDate")[0].date,
      totalCharacters: comic.characters.available,
      totalCreators: comic.creators.available,
      totalEvents: comic.events.available,
      totalStories: comic.stories.available,
    }));
  } else if (dataType === "creators") {
    return data.map((creator) => ({
      id: creator.id,
      fullname: creator.fullName,
      img: creator.thumbnail.path + "." + creator.thumbnail.extension,
      totalComics: creator.comics.available,
      totalEvents: creator.events.available,
      totalSeries: creator.series.available,
      totalStories: creator.stories.available,
    }));
  } else if (dataType === "events") {
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
  } else if (dataType === "series") {
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
  } else if (dataType === "stories") {
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

const getValidFilter = (datatype, options = {}) => {
  newOptions = {};
  if (
    datatype === "characters" ||
    datatype === "creators" ||
    datatype === "events"
  ) {
    if (options.nameStartsWith) {
      let nameStart = "%" + options.nameStartsWith;
      newOptions = { ...newOptions, nameStart };
    }
  } else if (datatype === "comics") {
    if (options.format) {
      let format = options.format;
      let validOptions = [
        "comic",
        "infinite comic",
        "digital comic",
        "graphic novel",
        "digest",
        "hardcover",
        "trade paperback",
        "magazine",
        "comic",
      ];
      let value = validOptions.some((e) => e == format);
      newOptions = value ? { ...newOptions, format } : { ...newOptions };
    }
    if (options.dateDescriptor) {
      let dateDescriptor = options.dateDescriptor;
      let validOptions = ["thisMonth", "nextWeek", "thisWeek", "lastWeek"];
      let value = validOptions.some((e) => e == dateDescriptor);
      newOptions = value
        ? { ...newOptions, dateDescriptor }
        : { ...newOptions };
    }
    if (options.titleStartsWith) {
      let titleStartsWith = "%" + options.titleStartsWith;
      newOptions = { ...newOptions, titleStartsWith };
    }
  } else if (datatype === "series") {
    if (options.titleStartsWith) {
      let titleStartsWith = "%" + options.titleStartsWith;
      newOptions = { ...newOptions, titleStartsWith };
    }
    if (options.seriesType) {
      let seriesType = options.seriesType;
      let validOptions = ["collection", "one shot", "limited", "ongoing"];
      let value = validOptions.some((e) => e == seriesType);
      newOptions = value ? { ...newOptions, seriesType } : { ...newOptions };
    }
    if (options.contains) {
      let contains = options.contains;
      let validOptions = [
        "comix",
        "megazine",
        "trade paperback",
        "hardcover",
        "digest",
        "graphic novel",
        "digital comic",
        "infinite comic",
      ];
      let value = validOptions.some((e) => e == contains);
      newOptions = value ? { ...newOptions, contains } : { ...newOptions };
    }
  }
  return newOptions;
};
const getValidSort = (dataType, options = "") => {
  let orderBy = {};
  if (dataType === "characters") {
    let validOptions = ["-name", "name", "modified", "-modified"];
    let value = validOptions.some((e) => e == options);
    orderBy = value ? { orderBy: options } : { ...orderBy };
  } else if (dataType === "comics") {
    let validOptions = ["onsaleDate", "-onsaleDate", "title", "-title"];
    let value = validOptions.some((e) => e == options);
    orderBy = value ? { orderBy: options } : { ...orderBy };
  } else if (dataType === "creators") {
    let validOptions = [
      "-lastName",
      "lastName",
      "-firstName",
      "firstName",
      "modified",
      "-modified",
    ];
    let value = validOptions.some((e) => e == options);
    orderBy = value ? { orderBy: options } : { ...orderBy };
  } else if (dataType === "events") {
    let validOptions = ["name", "-name", "startDate", "-startDate"];
    let value = validOptions.some((e) => e == options);
    orderBy = value ? { orderBy: options } : { ...orderBy };
  } else if (dataType === "series") {
    let validOptions = ["startYear", "-startYear", "title", "-title"];
    let value = validOptions.some((e) => e == options);
    orderBy = value ? { orderBy: options } : { ...orderBy };
  } else if (dataType === "stories") {
    let validOptions = ["modified", "-modified"];
    let value = validOptions.some((e) => e == options);
    orderBy = value ? { orderBy: options } : { ...orderBy };
  }

  return orderBy;
};
const objToQueryString = (obj) => {
  return Object.entries(obj)
    .map((params) => params.join("="))
    .join("&");
};
const getTotalPages = (type, limit) => {
  limit = limit > 1 ? (limit < 100 ? limit : 200) : 20;
  return axios
    .get(`https://gateway.marvel.com/v1/public/${type}${MARVEL_API}&limit=1`)
    .then(({ data }) => {
      const items = data.data.total; // total items
      const pages = items / limit > 1 ? Math.ceil(items / limit) : 1;
      return +pages;
    })
    .catch((err) => {
      return 1;
    });
};
const getValidQueries = (datatype, q = {}) => {
  if (!datatype) {
    return new Error("getValidQueries: datatype is required");
  }

  let filter = getValidFilter(datatype, q);
  let sort = getValidSort(datatype, q.orderBy);

  let limit = q.limit || 20;
  let offset = q.offset || 0;

  let queries = objToQueryString({ ...filter, ...sort, limit, offset });

  return queries;
};
const getType = (str = "") => {
  const split = str.split("/");
  return split[split.length - 1];
};

module.exports = {
  async getInfo(type, q = {}) {
    const dataType = getType(type);
    const limit = q.limit || 20;
    const page = q.page > 1 ? Math.ceil(q.page) : 1;

    const pages = await getTotalPages(type, limit);

    const offset = page > pages ? pages * limit - 20 : page * limit - 20;

    const queries = getValidQueries(dataType, { offset, ...q });

    return axios
      .get(
        `https://gateway.marvel.com/v1/public/${type}${MARVEL_API}&${queries}`
      )
      .then(({ data }) => {
        const result = convertData(data.data.results, dataType);

        return { success: true, pages, page: offset / limit + 1, data: result };
      })
      .catch((err) => {
        return {
          success: false,
          error: `${type.slice(0, -1)} not found`,
        };
      });
  },
  async getInfoById(id, type) {
    return axios
      .get(`https://gateway.marvel.com/v1/public/${type}/${id}${MARVEL_API}`)
      .then(({ data }) => ({ success: true, data: data.data.results[0] }))
      .catch(() => ({
        success: false,
        error: `${type.slice(0, -1)} not found`,
      }));
  },
  async getListsOfDataFromAnId(id, type, options = {}, dataType) {
    const queries = getValidQueries(options);

    return axios
      .get(
        `https://gateway.marvel.com/v1/public/${type}/${id}/${dataType}${MARVEL_API}&${queries}`
      )
      .then(({ data }) => {
        const result = convertData(data.data.results, dataType);
        const available = data.data.total;
        return { data: result, available };
      })
      .catch((err) => {
        console.log(err);
        return { data: [], available: 0 };
      });
  },
};
