"use strict";

const bse64 = require("base-64");
const User = require("../models/user-model");

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    return _authError();
  }

  let basic = req.headers.authorization.split(" ").pop();
  let [user, pw] = base64.decode(basic).split(":");

  try {
    req.user = await User.autheticateBasix(user, pass);
    next();
  } catch (e) {
    _authError();
  }

  function _authError() {
    res.status(403).send("Invalid Login");
  }
};
