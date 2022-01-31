const res = require("express/lib/response");
const { newsComics, getNextReleases, newsCharacters } = require("../utils");
module.exports = {
  async getNewsComics(req, res) {
    const comics = await newsComics("comics");
    res.send(comics);
  },
  async getNextReleases(req, res) {
    const comics = await getNextReleases("comics");
    res.send(comics);
  },
  async getCharacters(req, res) {
    const characters = await newsCharacters();
    res.send(characters);
  },
};
