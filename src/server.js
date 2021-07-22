"use strict";
// 3rd party resource
const express = require("express");
const cors = require("cors");

const notFound = require("./error-handlers/404");
const errorHandler = require("./error-handlers/500");

const authRoutes = require("./routes/user-routes");
const productRoutes = require("./routes/product-router");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use(authRoutes);
app.use(productRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = {
  app: app,
  start: (port) => {
    app.listen(port, () => console.log(`Server up on ${port}`));
  },
};
