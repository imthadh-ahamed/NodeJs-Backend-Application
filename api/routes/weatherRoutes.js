import express from "express";
import { getWeatherData } from "../controllers/weatherController.js";

const router = express.Router();

// Route to handle GET request to fetch weather data
router.get("/weather/:email/:date", getWeatherData);

export default router;
