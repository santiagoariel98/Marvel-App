import axios from "axios";

const URL_API = "https://marvel-api-sv.herokuapp.com/api/";

const getQuery = (q) => {
  return Object.entries(q)
    .map((e) => e.join("="))
    .join("&");
};

export const fetchRandomData = ({ type }) => {
  if (type === "characters") {
    const random = Math.floor(Math.random() * 311) + 1;
    return axios(
      `${URL_API}${type}?orderBy=modified&limit=5&page=${random}`
    ).then(({ data }) => data);
  }
};

export const fetchData = ({ type, q = {} }) => {
  let query = getQuery(q);
  return axios(`${URL_API}${type}?${query}`).then(({ data }) => data);
};

export const fetchDataById = ({ type, id }) => {
  console.log(type, id);
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
