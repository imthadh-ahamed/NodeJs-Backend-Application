import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const fetchWeatherData = async (location) => {
  const response = await axios.get(
    `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.OPENWEATHER_API_KEY}`
  );
  const { temp } = response.data.main;
  const { description } = response.data.weather[0];
  return { temperature: temp, description };
};
