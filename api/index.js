import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cron from "node-cron";
import { fetchWeatherData } from "./services/weatherService.js";
import { sendEmail, generateWeatherText } from "./services/emailService.js"; 
import User from "./models/User.js";
import userRoutes from "./routes/userRoutes.js";
import weatherRoutes from "./routes/weatherRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/weather", weatherRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

  

//Cron job to send weather updates every 3 hrs
cron.schedule("*/1 * * * *", async () => {
  try {
    const users = await User.find();
    for (const user of users) {
      const weatherData = await fetchWeatherData(user.location);
      const weatherText = await generateWeatherText(
        weatherData.temperature,
        weatherData.description,
        user.location // Pass location to generateWeatherText
      );

      // Save the generated report to MongoDB
      user.weatherData.push({
        date: new Date(),
        temperature: weatherData.temperature,
        description: weatherData.description,
        generatedReport: weatherText,
      });
      await user.save();

      // Send the email with weather data and generated text
      await sendEmail(user.email, weatherData, weatherText);
    }
  } catch (error) {
    console.error("Error in cron job:", error);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
