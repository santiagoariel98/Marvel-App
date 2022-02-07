import axios from "axios";

export function fetchGetCharacters() {
  return axios
    .get("https://marvel-api-sv.herokuapp.com/api/characters")
    .then(({ data }) => data);
}

export function fetchGetCharacterById(id) {
  return axios
    .get("https://marvel-api-sv.herokuapp.com/api/characters/" + id)
    .then(({ data }) => data);
}

export function fetchGetData(data) {
  const { type, id, datatype, pages } = data;
  let q = data.q ? data.q : {};
  let query = Object.entries(q)
    .map((e) => e.join("="))
    .join("&");
  return axios
    .get(
      `https://marvel-api-sv.herokuapp.com/api/${type}/${id}/${datatype}?page=${pages}&${query}`
    )
    .then(({ data }) => ({ data, datatype }));
}
