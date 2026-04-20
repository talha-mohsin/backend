import nodemailer from "nodemailer";
import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import handlebars from "handlebars";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const verifyMail = async (token, email) => {
  const emailTemplateSource = fs.readFileSync(
    path.join(__dirname, "template.hbs"),
    "utf-8",
  );

  const template = handlebars.compile(emailTemplateSource);
  const htmlToSend = template({ token: encodeURIComponent(token) });

  // creating transporter
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER, // the email you used to create app password
      pass: process.env.MAIL_PASS, // your generated app password
    },
  });

  // mail options
  const mailOptions = {
    from: process.env.MAIL_USER, // the email captured from the form
    to: email, // the email you want to receive emails
    subject: "NodeMailer Testing", // the subject captured
    html: htmlToSend, // the message captured
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      throw new Error(err);
    }
    console.log(`Email sent successfully`);
    console.log(info);
  });
};
