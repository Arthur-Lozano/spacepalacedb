"use strict";

require("dotenv").config();
const mongoose = require("mongoose");

const server = require("./src/server");

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

mongoose.connect(process.env.MONGODB_URI, options).then(() => {
  console.log("Database up and running!");
  server.start(process.env.PORT || 3333);
});
