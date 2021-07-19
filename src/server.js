"use strict";
// 3rd party resource
const express = require("express");
const cors = require("cors");
const notFound = require("./error-handlers/404");
const errorHandler = require("./error-handlers/500");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(notFound);
app.use(errorHandler);

module.exports = {
  app: app,
  start: (port) => {
    app.listen(port, () => console.log(`Server up on ${port}`));
  },
};
