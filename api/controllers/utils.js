const axios = require("axios");
const MARVEL_API = process.env.MARVEL_API;

const totalItems = ({ type, id, datatype }, q = {}) => {
  type = id && datatype ? `${type}/${id}/${datatype}` : type;
  datatype = datatype || type;
  let queries = getValidQueries(datatype, { ...q, limit: 1 });
  return axios
    .get(`https://gateway.marvel.com/v1/public/${type}${MARVEL_API}&${queries}`)
    .then(({ data }) => data.data.total);
};

const getCurrentDate = () => {
  return new Date().toISOString().split("T")[0];
};
const getLastWeek = () => {
  let today = new Date();
  let lastWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 7
  );
  return lastWeek.toISOString().split("T")[0];
};
const getNextWeek = () => {
  let today = new Date();
  let lastWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 8
  );
  return lastWeek.toISOString().split("T")[0];
};
const getNextDay = () => {
  let today = new Date();
  return new Date(today.getTime() + 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];
};

const convertData = (data, dataType) => {
  if (dataType === "characters") {
    return data.map((character) => ({
      id: character.id,
      name: character.name,
      img: character.thumbnail.path + "." + character.thumbnail.extension,
      desc: character.description,
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
      price: comic.prices.filter((price) => price.type === "printPrice")[0]
        .price,
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
      let nameStartsWith =
        "%" + options.nameStartsWith.trim().replace(/\s+/g, "%");
      newOptions = { ...newOptions, nameStartsWith };
    }
    if (datatype === "characters") {
      if (options.events) {
        let events = options.events;
        let value = events.split(",").every((num) => num == +num);
        newOptions = value ? { ...newOptions, events } : { ...newOptions };
      }
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
      let titleStartsWith =
        "%" + options.titleStartsWith.trim().replace(/\s+/g, "%");
      newOptions = { ...newOptions, titleStartsWith };
    }
    if (options.dateRange) {
      let dateRange = options.dateRange;
      let value = dateRange
        .split(",")
        .every((e) => new Date(e) != "Invalid Date");
      newOptions = value ? { ...newOptions, dateRange } : { ...newOptions };
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
    if (options.startYear) {
      let startYear = options.startYear;
      let value = +startYear == startYear;
      newOptions = value ? { ...newOptions, startYear } : { ...newOptions };
    }
  }
  return newOptions;
};
const getById = (id, type) => {
  return axios
    .get(`https://gateway.marvel.com/v1/public/${type}/${id}${MARVEL_API}`)
    .then(({ data }) => ({ success: true, data: data.data.results[0] }))
    .catch(() => ({
      success: false,
      error: `${type.slice(0, -1)} not found`,
    }));
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

const getListsOfDataFromAnId = async (id, type, q = {}, datatype) => {
  try {
    const limit = q.limit || 20;
    const page = q.page > 1 ? Math.ceil(q.page) : 1;

    const items = await totalItems({ type, id, datatype }, q);

    let pages = items / limit > 1 ? Math.ceil(items / limit) : 1;

    const offset = page > pages ? pages * limit - limit : page * limit - limit;

    const queries = getValidQueries(datatype, { ...q, offset });

    return axios
      .get(
        `https://gateway.marvel.com/v1/public/${type}/${id}/${datatype}${MARVEL_API}&${queries}`
      )
      .then(({ data }) => {
        const result = convertData(data.data.results, datatype);
        const available = data.data.total;
        return {
          success: true,
          pages,
          page: offset / limit + 1,
          data: result,
          available,
        };
      })
      .catch((err) => {
        return { success: false, error: `${type.slice(0, -1)} ID invalid` };
      });
  } catch (error) {
    return { success: false, error: `${type.slice(0, -1)} ID invalid` };
  }
};
module.exports = {
  getListsOfDataFromAnId,

  async getInfo(type, q = {}) {
    const limit = q.limit || 20;

    const page = q.page > 1 ? Math.ceil(q.page) : 1;

    let items = await totalItems({ type }, q);

    let pages = items / limit > 1 ? Math.ceil(items / limit) : 1;

    const offset = page > pages ? pages * limit - limit : page * limit - limit;

    const queries = getValidQueries(type, { offset, ...q });
    return axios
      .get(
        `https://gateway.marvel.com/v1/public/${type}${MARVEL_API}&${queries}`
      )
      .then(({ data }) => {
        const result = convertData(data.data.results, type);

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
    let info = await getById(id, type);
    if (info.success) {
      let data = info.data;
      let dataInfo = {};
      if (data.hasOwnProperty("events") && data.events.available) {
        let events = await getListsOfDataFromAnId(
          id,
          type,
          { limit: 20 },
          "events"
        );
        dataInfo = { ...dataInfo, events };
      }
      if (data.hasOwnProperty("creators") && data.creators.available) {
        let creators = await getListsOfDataFromAnId(
          id,
          type,
          { limit: 20 },
          "creators"
        );
        dataInfo = { ...dataInfo, creators };
      }
      if (data.hasOwnProperty("characters") && data.characters.available) {
        let characters = await getListsOfDataFromAnId(
          id,
          type,
          { limit: 20 },
          "characters"
        );
        dataInfo = { ...dataInfo, characters };
      }
      if (data.hasOwnProperty("comics") && data.comics.available) {
        let comics = await getListsOfDataFromAnId(
          id,
          type,
          { limit: 20 },
          "comics"
        );
        dataInfo = { ...dataInfo, comics };
      }
      if (data.hasOwnProperty("stories") && data.stories.available) {
        let stories = await getListsOfDataFromAnId(
          data.id,
          type,
          { limit: 20 },
          "stories"
        );
        dataInfo = { ...dataInfo, stories };
      }
      if (data.hasOwnProperty("series") && data.series.available) {
        let series = await getListsOfDataFromAnId(
          data.id,
          type,
          { limit: 20 },
          "series"
        );
        dataInfo = { ...dataInfo, series };
      }
      const converInfo = convertData([info.data], type)[0];

      return { success: true, data: { ...converInfo, ...dataInfo } };
    } else {
      return info;
    }
  },
  getCurrentDate,
  getLastWeek,
  getNextWeek,
  getNextDay,
};
