const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

console.log(process.env.EMAIL)
console.log(process.env.PASSWORD)
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL, // your email address to send email from
    pass: process.env.PASSWORD // your gmail account password
  }
});

module.exports = transporter;
