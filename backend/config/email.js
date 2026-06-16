console.log("EMAIL CONFIG LOADED");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify(function(error, success) {
  if (error) {
    console.log("EMAIL VERIFY ERROR:", error);
  } else {
    console.log("EMAIL SERVER READY");
  }
});

module.exports = transporter;