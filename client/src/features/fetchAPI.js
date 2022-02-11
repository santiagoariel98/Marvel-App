import axios from "axios";

const URL_API = "https://marvel-api-sv.herokuapp.com/api/";

const getQuery = (q) => {
  return Object.entries(q)
    .map((e) => e.join("="))
    .join("&");
};

export const fetchRandomData = ({ type }) => {
  let random = 1;
  let orderBy = "modified";
  if (type === "characters") {
    random = Math.floor(Math.random() * 311) + 1;
  } else if (type === "comics") {
    orderBy = "issueModified";
    random = Math.floor(Math.random() * 10000) + 1;
  } else if (type === "creators") {
    random = Math.floor(Math.random() * 1000) + 1;
  } else if (type === "events") {
    random = Math.floor(Math.random() * 15) + 1;
  } else if (type === "series") {
    random = Math.floor(Math.random() * 2500) + 1;
  }
  return axios(
    `${URL_API}${type}?orderBy=${orderBy}&limit=5&page=${random}`
  ).then(({ data }) => data);
};

export const fetchData = ({ type, q = {} }) => {
  let query = getQuery(q);
  return axios(`${URL_API}${type}?${query}`).then(({ data }) => data);
};

export const fetchDataById = ({ type, id }) => {
  return axios(`${URL_API}${type}/${id}`).then(({ data }) => data);
};

export const fetchSubDataById = ({ type, id, datatype, q = {} }) => {
  let query = getQuery(q);
  return axios(`${URL_API}${type}/${id}/${datatype}?${query}`).then(
    ({ data }) => ({
      data,
      datatype,
    })
  );
};
