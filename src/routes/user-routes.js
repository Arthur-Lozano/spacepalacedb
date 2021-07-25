"use strict";

const express = require("express");
const authRouter = express.Router();

const User = require("../models/user-model");

const basicAuth = require("../middleware/basic");
const bearerAuth = require("../middleware/bearer");

authRouter.post("/register", async (req, res, next) => {
  try {
    console.log(req.body);

    let user = new User(req.body);
    const userRecord = await user.save();
    console.log(userRecord, "This is the record");

    const output = {
      user: userRecord,
      token: userRecord.token,
    };

    res.status(201).json(output);
  } catch (e) {
    next(e.message);
  }
});

authRouter.post("/login", basicAuth, (req, res, next) => {
  try {
    const user = {
      user: req.user,
      token: req.user.token,
    };
    res.status(200).json(user);
  } catch (e) {
    next(e.message);
  }
});

authRouter.get("/user/:id", bearerAuth, async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    res.status(200).json(user);
  } catch (e) {
    next(e.message);
  }
});

module.exports = authRouter;
