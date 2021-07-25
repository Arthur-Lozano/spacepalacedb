"use strict";

const base64 = require("base-64");
const User = require("../models/user-model");

module.exports = async (req, res, next) => {
  console.log(req.headers.authorization);
  if (!req.headers.authorization) {
    return _authError();
  }

  let basic = req.headers.authorization.split(" ").pop();
  let [email, pw] = base64.decode(basic).split(":");
  console.log(email, pw);

  try {
    req.user = await User.authenticateBasic(email, pw);
    next();
  } catch (e) {
    _authError();
  }

  function _authError() {
    res.status(403).send("Invalid Login");
  }
};
