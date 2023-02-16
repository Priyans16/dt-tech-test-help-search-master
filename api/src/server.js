const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/search", async (req, res) => {
  try {
    const { status, data } = await axios.get(
      "https://help-search-api-prod.herokuapp.com/search",
      { params: req.query }
    );

    res.status(status);
    res.send(data);
  } catch (err) {
    if (err.isAxiosError) {
      res.status(err.response.status);
      res.send(err.response.data);
    } else {
      throw err;
    }
  }
});

/**
 * search with Pagination api
 * Considering page size as 10 as per requirement
 */
app.get("/search/:page", async (req, res) => {
  try {
    const { status, data } = await axios.get(
      "https://help-search-api-prod.herokuapp.com/search",
      { params: req.query }
    );
    let page = parseInt(req.params.page);
    let _data = data.results
    let maxPages = Math.ceil(_data.length / 10);

    if (page == maxPages - 1) {
      res.send({ results: _data.slice(page * 10) });
    }
    else {
      res.send({ results: _data.slice(page * 10, (page + 1) * 10) });
    }

    res.status(status);
  } catch (err) {
    if (err.isAxiosError) {
      res.status(err.response.status);
      res.send(err.response.data);
    } else {
      throw err;
    }
  }
});

exports.startServer = () => {
  const port = process.env.PORT || "3001";
  app.listen(port, () => console.log("Listening on :3001"));
};
