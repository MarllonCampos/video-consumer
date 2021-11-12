const express = require("express");
const cors = require("cors");
const uuid = require("uuid");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());

app.use("/videos", express.static("./"));

app.get("/", (req, res) => {
  fs.readdir("videos", (err, files) => {
    let videosObj = [];
    if (err)
      res.status(500).send(`An error occurred ${err}`);
    files.forEach((file) => {
      videosObj.push({ id: uuid.v4(), name: file });
    });
    res.status(200).json(videosObj);
  });
});

app.listen(3300, () => {
  console.log("Server listen on port 3300");
});
