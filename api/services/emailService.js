import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Creating a Nodemailer transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Function to send email with weather data
export const sendEmail = async (email, weatherData) => {
  let info = await transporter.sendMail({
    from: `"Weather Report" <${process.env.EMAIL}>`,
    to: email,
    subject: "Hourly Weather Report",
    text: `Current Temperature: ${weatherData.temperature}, Description: ${weatherData.description}`,
  });

  console.log("Message sent: %s", info.messageId);
};
