import axios from "axios";

export function fetchGetEvents() {
  return axios
    .get("https://marvel-api-sv.herokuapp.com/api/events/news")
    .then(({ data }) => data);
}

export function fetchGetComicsNews(id) {
  return axios
    .get("https://marvel-api-sv.herokuapp.com/api/comics/news")
    .then(({ data }) => data);
}
export function fetchGetComicsLast(id) {
  return axios
    .get("https://marvel-api-sv.herokuapp.com/api/comics/last")
    .then(({ data }) => data);
}
export function fetchGetSeries(id) {
  return axios
    .get("https://marvel-api-sv.herokuapp.com/api/series/news")
    .then(({ data }) => data);
}
export function fetchGetCharacters(id) {
  return axios
    .get("https://marvel-api-sv.herokuapp.com/api/characters/news")
    .then(({ data }) => data);
}
