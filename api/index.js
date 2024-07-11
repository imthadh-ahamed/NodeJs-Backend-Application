import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cron from "node-cron";
import { fetchWeatherData } from "./services/weatherService.js";
import { sendEmail, generateWeatherText } from "./services/emailService.js"; 
import User from "./models/User.js";
import userRoutes from "./routes/userRoutes.js";
import weatherRoutes from "./routes/weatherRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Routes for user and weather APIs
app.use("/api/user", userRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/auth", authRoutes);


// Handle root route
app.get('/', (req, res) => {
  res.send('Welcome to the Weather App API');
});


// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

  

//Cron job to send weather updates every 3 hrs
// cron.schedule("0 */3 * * *", async () => {
//Note: I reduce the time as 2 min for my testing purpose
cron.schedule("*/2 * * * *", async () => {
  try {
    // Fetch all users from the database
    const users = await User.find();
    for (const user of users) {
      // Fetch weather data for the user's location
      const weatherData = await fetchWeatherData(user.location);
      // Generate weather report text using the fetched data and user's location
      const weatherText = await generateWeatherText(
        weatherData.temperature,
        weatherData.description,
        user.location
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

// Start the Express server on the specified port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
