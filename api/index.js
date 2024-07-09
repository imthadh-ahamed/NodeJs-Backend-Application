import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cron from "node-cron";
import userRoutes from "./routes/userRoutes.js";
import weatherRoutes from "./routes/weatherRoutes.js";
import { fetchWeatherData } from "./services/weatherService.js";
import { sendEmail } from "./services/emailService.js";
import User from "./models/User.js";

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
  .catch((err) => console.log(err));

// Schedule task to send weather updates every 3 hours
cron.schedule("0 */3 * * *", async () => {
  const users = await User.find();
  users.forEach(async (user) => {
    const weatherData = await fetchWeatherData(user.location);
    user.weatherData.push({ date: new Date(), ...weatherData });
    await user.save();
    await sendEmail(user.email, weatherData);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
