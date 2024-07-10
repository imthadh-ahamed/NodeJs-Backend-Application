import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// Function to fetch weather data for a location
export const fetchWeatherData = async (location) => {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=imperial`;

    // Log the API key and request URL
    console.log("API Key:", apiKey);
    console.log("Request URL:", requestUrl);

    // Making GET request to OpenWeatherMap API using Axios
    const response = await axios.get(requestUrl);

    // Destructuring temperature and description from response data
    const { temp } = response.data.main;
    const { description } = response.data.weather[0];

    // Returning an object with temperature and description
    return { temperature: temp, description };
  } catch (error) {
    // Handling any errors that occur during API request
    console.error(
      "Error fetching weather data:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};


