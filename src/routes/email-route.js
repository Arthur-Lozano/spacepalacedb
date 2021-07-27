const path = require('path');
const express = require('express');
const emailRouter = express.Router();

const buildPath = path.join(__dirname, '..', 'build');
emailRouter.use(express.json());
emailRouter.use(express.static(buildPath));

emailRouter.post('/send', (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

module.exports = emailRouter;