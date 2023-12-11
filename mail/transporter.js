const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "32026d1a614b28",
    pass: "0258158c78c305",
  },
});

// checking connection
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Mail server is running...");
  }
});

module.exports = transporter;
