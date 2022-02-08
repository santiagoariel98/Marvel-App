import axios from "axios";

const URL_API = "https://marvel-api-sv.herokuapp.com/api/";

export const fetchData = ({ type }) => {
  return axios(`${URL_API}${type}`).then(({ data }) => data);
};

export const fetchDataById = ({ type, id }) => {
  console.log(type, id);
  return axios(`${URL_API}${type}/${id}`).then(({ data }) => data);
};

export const fetchSubDataById = ({ type, id, datatype, q = {} }) => {
  let query = Object.entries(q)
    .map((e) => e.join("="))
    .join("&");
  return axios(`${URL_API}${type}/${id}/${datatype}?${query}`).then(
    ({ data }) => ({
      data,
      datatype,
    })
  );
};
