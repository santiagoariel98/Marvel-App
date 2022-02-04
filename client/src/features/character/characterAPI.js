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
