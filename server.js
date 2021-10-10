const express = require("express");
const path = require("path");
// Making formField work
const nodeMailer = require("nodemailer");
const dotenv = require("dotenv").config();

let app = express();
let initialPath = (__dirname, "public");

app.use(express.static(initialPath));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(initialPath, "index.html"));
});

// FormField details
app.post("/mail", (req, res) => {
  const { firstname, lastname, email, msg } = req.body;

  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  // MAIL Structure
  const mailOptions = {
    from: "enter sender email here",
    to: "enter receiver email here",
    subject: "Postfolio",
    text: `First name: ${firstname}, \nLast name: ${lastname}, \nEmail: ${email}, \nMessage: ${msg}`,
  };
  // Call transporter to send the mail
  transporter.sendMail(mailOptions, (err, result) => {
    if (err) {
      console.log(err);
      res.json(
        "It seems like there was an error in your input. Please try again."
      );
    } else {
      res.json("Thanks for emailing me. I will reply within 2 working days!");
    }
  });
});

app.listen("4000", () => {
  app.use(express.json());
  console.log(`Listening on port 3000`);
});
