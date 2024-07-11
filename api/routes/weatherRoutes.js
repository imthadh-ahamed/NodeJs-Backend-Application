import express from "express";
import { getWeatherData } from "../controllers/weatherController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Route to handle GET request to fetch weather data
router.get("/weather/:email/:date", authenticateToken, getWeatherData);

export default router;
