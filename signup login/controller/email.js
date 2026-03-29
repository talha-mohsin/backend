import nodemailer from "nodemailer";
import dotenv from "dotenv";

// dotenv config
dotenv.config();

export const welcomeEmail = async (req, res) => {
  try {
    // set up transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL, // the email you used to create app password
        pass: process.env.APP_PASS, // your generated app password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL, // the email captured from the form
      to: "hasanlodhi000@gmail.com", // the email you want to receive emails
      subject: "hello from Nodemailer", // the subject captured
      text: "this is an test email sent using Nodemailer", // the message captured
    };

    await transporter.sendMail(mailOptions);

    res.json({
      status: true,
      message: "Email send successfully!",
    });
  } catch (error) {
    res.json({
      status: false,
      message: error.message || "something went wrong",
    });
  }
};
