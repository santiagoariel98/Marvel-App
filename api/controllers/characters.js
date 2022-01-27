const axios = require("axios");

const MARVEL_API = process.env.MARVEL_API;

module.exports = {
  getCharacters(req, res) {
    try {
      const q = req.query;
      const page = q.page && q.page > 0 ? q.page : 1; // min:1, max: n, default:1
      if (isNaN(page)) {
        throw Error(`Error ${page} is not a number`);
      }
      const limit = 20; // limit item per page
      const offset = page > 77 ? 1540 : limit * page - limit;
      axios
        .get(
          `https://gateway.marvel.com/v1/public/characters${MARVEL_API}&limit=${limit}&offset=${offset}`
        )
        .then((request) => {
          const data = request.data.data;
          res.send({ data: data, success: true });
        });
    } catch (error) {
      res.send({ error: "An error has occurred", success: false }).status(500);
    }
  },

  getCharacterById(req, res) {
    const { id } = req.params;
    axios
      .get(`https://gateway.marvel.com/v1/public/characters/${id}${MARVEL_API}`)
      .then((request) => {
        const data = request.data.data;
        res.send({ data, success: true });
      })
      .catch((err) => {
        res.send({ error: "Characters not found", success: false }).status(404);
      });
  },
  getComicsCharacter(req, res) {
    const { id } = req.params; // ID Personaje/Characters
    const q = req.query;

    const limit = q.limit && q.limit >= 10 && q.limit <= 100 ? q.limit : 20; // min: 10, max: 100, default: 20
    const page = q.page && q.page > 0 ? q.page : 1; // min:1, max: n, default:1
    const totalComics = isNaN(q.totalComics) ? "" : q.totalComics; // min: 1, default: false
    // totalComics = es: "cómics" en los que aparece el personaje.
    // totalComics = en: comics in which the character appears.

    let offset, tPage;
    // tPage = es: Total de "paginacion" que tiene los "cómics" de un personaje.
    // tPage = en: Total "pagination" of a character's "comics".
    if (totalComics && page >= 2) {
      tPage = Math.ceil(totalComics / limit);
      offset = page >= tPage ? tPage * limit - limit : page * limit - limit;

      axios
        .get(
          `https://gateway.marvel.com/v1/public/characters/${id}/comics${MARVEL_API}&offset=${offset}&limit=${limit}`
        )
        .then((request) => {
          const data = request.data.data; // data

          if (totalComics != data.total) {
            res
              .send({
                error: `Modify the parameter 'totalComics' by the value '${data.total}' and try again`,
                success: false,
                total: data.total,
              })
              .status(400);
          } else {
            res.send({ data, success: true });
          }
        })
        .catch((err) => {
          res
            .send({ error: "An error has occurred", success: false })
            .status(500);
        });
    } else {
      axios
        .get(
          `https://gateway.marvel.com/v1/public/characters/${id}/comics${MARVEL_API}&limit=${limit}`
        )
        .then((request) => {
          const data = request.data.data; // data
          if (data.total) {
            res.send({ data, success: true });
          } else {
            res.send({ error: "Comics not found", success: false });
          }
        })
        .catch((err) => {
          res
            .send({ error: "Characters not found", success: false })
            .status(404);
        });
    }
  },
  getEventsCharacter(req, res) {
    const { id } = req.params; // ID Personaje/Characters
    const q = req.query;

    const limit = q.limit && q.limit >= 10 && q.limit <= 100 ? q.limit : 20; // min: 10, max: 100, default: 20
    const page = q.page && q.page > 0 ? q.page : 1; // min:1, max: n, default:1
    const totalEvents = isNaN(q.totalEvents) ? "" : q.totalEvents; // min: 1, default: false
    // totalEvents = es: "eventos" en los que aparece el personaje.
    // totalEvents = en: events in which the character appears.

    let offset, tPage;
    // tPage = es: Total de "paginacion" que tiene los "eventos" de un personaje.
    // tPage = en: Total "pagination" of a character's "events".
    if (totalEvents && page >= 2) {
      tPage = Math.ceil(totalEvents / limit);
      offset = page >= tPage ? tPage * limit - limit : page * limit - limit;

      axios
        .get(
          `https://gateway.marvel.com/v1/public/characters/${id}/events${MARVEL_API}&offset=${offset}&limit=${limit}`
        )
        .then((request) => {
          const data = request.data.data; // data

          if (totalEvents != data.total) {
            res
              .send({
                error: `Modify the parameter 'totalEvents' by the value '${data.total}' and try again`,
                success: false,
                total: data.total,
              })
              .status(400);
          } else {
            res.send({ data, success: true });
          }
        })
        .catch((err) => {
          res
            .send({ error: "An error has occurred", success: false })
            .status(500);
        });
    } else {
      axios
        .get(
          `https://gateway.marvel.com/v1/public/characters/${id}/events${MARVEL_API}&limit=${limit}`
        )
        .then((request) => {
          const data = request.data.data; // data
          if (data.total) {
            res.send({ error: "Event not found", success: false }).status(400);
          }
          res.send({ data, success: true });
        })
        .catch((err) => {
          res.send({ error: "Event not found", success: false }).status(404);
        });
    }
  },
  getSeriesCharacter(req, res) {
    const { id } = req.params; // ID Personaje/Characters
    const q = req.query;

    const limit = q.limit && q.limit >= 10 && q.limit <= 100 ? q.limit : 20; // min: 10, max: 100, default: 20
    const page = q.page && q.page > 0 ? q.page : 1; // min:1, max: n, default:1
    const totalSeries = isNaN(q.totalSeries) ? "" : q.totalSeries; // min: 1, default: false
    // totalSeries = es: "Series" en los que aparece el personaje.
    // totalSeries = en: Series in which the character appears.

    let offset, tPage;
    // tPage = es: Total de "paginacion" que tiene los "Series" de un personaje.
    // tPage = en: Total "pagination" of a character's "series".
    if (totalSeries && page >= 2) {
      tPage = Math.ceil(totalSeries / limit);
      offset = page >= tPage ? tPage * limit - limit : page * limit - limit;

      axios
        .get(
          `https://gateway.marvel.com/v1/public/characters/${id}/series${MARVEL_API}&offset=${offset}&limit=${limit}`
        )
        .then((request) => {
          const data = request.data.data; // data

          if (totalSeries != data.total) {
            res
              .send({
                error: `Modify the parameter 'totalSeries' by the value '${data.total}' and try again`,
                success: false,
                total: data.total,
              })
              .status(400);
          } else {
            res.send({ data, success: true });
          }
        })
        .catch((err) => {
          res
            .send({ error: "An error has occurred", success: false })
            .status(500);
        });
    } else {
      axios
        .get(
          `https://gateway.marvel.com/v1/public/characters/${id}/series${MARVEL_API}&limit=${limit}`
        )
        .then((request) => {
          const data = request.data.data; // data
          if (data.total) {
            res.send({ data, success: true });
          } else {
            res.send({ error: "Serie not found", success: false }).status(400);
          }
        })
        .catch((err) => {
          res.send({ error: "Serie not found", success: false }).status(404);
        });
    }
  },

  getStoriesCharacter(req, res) {
    const { id } = req.params; // ID Personaje/Characters
    const q = req.query;

    const limit = q.limit && q.limit >= 10 && q.limit <= 100 ? q.limit : 20; // min: 10, max: 100, default: 20
    const page = q.page && q.page > 0 ? q.page : 1; // min:1, max: n, default:1
    const totalStories = isNaN(q.totalStories) ? "" : q.totalStories; // min: 1, default: false
    // totalStories = es: "Historias" en los que aparece el personaje.
    // totalStories = en: Stories in which the character appears.

    let offset, tPage;
    // tPage = es: Total de "paginacion" que tiene los "Historias" de un personaje.
    // tPage = en: Total "pagination" of a character's "Stories".
    if (totalStories && page >= 2) {
      tPage = Math.ceil(totalStories / limit);
      offset = page >= tPage ? tPage * limit - limit : page * limit - limit;

      axios
        .get(
          `https://gateway.marvel.com/v1/public/characters/${id}/stories${MARVEL_API}&offset=${offset}&limit=${limit}`
        )
        .then((request) => {
          const data = request.data.data; // data

          if (totalStories != data.total) {
            res
              .send({
                error: `Modify the parameter 'totalStories' by the value '${data.total}' and try again`,
                success: false,
                total: data.total,
              })
              .status(400);
          } else {
            res.send({ data, success: true });
          }
        })
        .catch((err) => {
          res
            .send({ error: "An error has occurred", success: false })
            .status(500);
        });
    } else {
      axios
        .get(
          `https://gateway.marvel.com/v1/public/characters/${id}/stories${MARVEL_API}&limit=${limit}`
        )
        .then((request) => {
          const data = request.data.data; // data
          if (data.total) {
            res.send({ data, success: true });
          } else {
            res.send({ error: "Storie not Found", success: false }).status(400);
          }
        })
        .catch((err) => {
          res.send({ error: "Storie not found", success: false }).status(400);
        });
    }
  },
};
