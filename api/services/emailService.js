import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

// Creating a Nodemailer transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Initialize GoogleGenerativeAI with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Function to generate weather-related text using Gemini API
export const generateWeatherText = async (
  temperature,
  description,
  location
) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Location: ${location}, Temperature: ${temperature}°C, Weather description: ${description}. According the details genearte the weather report`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text.trim(); // Return generated text
  } catch (error) {
    console.error("Error generating weather text:", error);
    throw error;
  }
};

// Function to send email with weather data and generated text
export const sendEmail = async (email, weatherData, weatherText) => {
  try {
    // Send email using Nodemailer
    let info = await transporter.sendMail({
      from: `"Weather Report" <${process.env.EMAIL}>`,
      to: email,
      subject: "Hourly Weather Report",
      text: `Current Temperature: ${weatherData.temperature}, Description: ${weatherData.description}\n\nWeather Summary: ${weatherText}`,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
