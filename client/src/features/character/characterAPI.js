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
  return axios
    .get(
      `https://marvel-api-sv.herokuapp.com/api/${type}/${id}/${datatype}?page=${pages}`
    )
    .then(({ data }) => data);
}
