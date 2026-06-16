const nodemailer = require("nodemailer");

console.log("EMAIL CONFIG LOADED");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_LOGIN,
    pass: process.env.BREVO_SMTP_KEY,
  },
});

console.log("BREVO LOGIN:", process.env.BREVO_SMTP_LOGIN);
console.log("BREVO KEY EXISTS:", !!process.env.BREVO_SMTP_KEY);

transporter.verify((error, success) => {
  if (error) {
    console.log("SMTP ERROR:", error);
  } else {
    console.log("SMTP READY");
  }
});

module.exports = transporter;