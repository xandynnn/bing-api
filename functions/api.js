const express = require("express");
const cors = require("cors");
const axios = require("axios");
const serveless = require("serverless-http");

const instance = axios.create({
  baseURL: "https://www.bing.com",
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.get("/", async (req, res) => {
  try {
    const result = await instance.get(
      "/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=pt-BR"
    );
    return res.send({ url: result.data.images[0].url });
  } catch (err) {
    return res.status(400).send({ error: "Error loading image" });
  }
});

app.get("/json", (req, res) => {
  res.json({
    path: "json",
    author: "Jhon",
  });
});

// app.listen(process.env.PORT || 3000, () =>
//   console.log("App running on port: 3000")
// );

module.exports.handler = serveless(app);
