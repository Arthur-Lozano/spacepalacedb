const path = require('path');
const express = require('express');
const transporter = require('../config/config');
const dotenv = require('dotenv');
dotenv.config();
const emailRouter = express.Router();
emailRouter.use(express.json());

emailRouter.post('/send', (req, res) => {
  const mailOptions = {
    from: req.body.email, // sender address
    to: process.env.EMAIL, // list of receivers
    subject: req.body.subject, // Subject line
    html: `
      <p>You have a new contact request.</p>
      <h3>Contact Details</h3>
      <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        <li>Subject: ${req.body.subject}</li>
        <li>Message: ${req.body.message}</li>
      </ul>
      `
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      res.status(500).send({
        success: false,
        message: 'Something went wrong. Try again later'
      });
    } else {
      res.send({
        success: true,
        message: 'Thanks for contacting us. We will get back to you shortly'
      });
    }
  });
});

module.exports = emailRouter;