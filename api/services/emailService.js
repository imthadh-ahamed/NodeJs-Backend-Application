import nodemailer from "nodemailer";
import axios from "axios";
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

// Function to generate weather-related text using Gemini API
const generateWeatherText = async (temperature, description) => {
  const prompt = `The temperature is ${temperature} and the weather is ${description}.`;
  const apiKey = process.env.GEMINI_API_KEY;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/engines/davinci-codex/completions",
      {
        prompt: prompt,
        max_tokens: 50, // Adjust max tokens as per your need
        stop: ["\n", "###"],
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].text.trim(); // Return generated text
  } catch (error) {
    console.error("Error generating weather text:", error);
    throw error;
  }
};

// Function to send email with weather data and generated text
export const sendEmail = async (email, weatherData) => {
  try {
    // Generate weather text using OpenAI's API
    const weatherText = await generateWeatherText(
      weatherData.temperature,
      weatherData.description
    );

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
