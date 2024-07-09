import express from "express";
import { getWeatherData } from "../controllers/weatherController.js";

const router = express.Router();

router.get("/weather/:email/:date", getWeatherData);

export default router;
