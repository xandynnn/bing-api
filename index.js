const express = require("express");
const cors = require("cors");
const axios = require("axios");

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

app.listen(process.env.PORT || 3000);
