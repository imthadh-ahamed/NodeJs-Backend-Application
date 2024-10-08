import User from "../models/User.js";
import { generateWeatherText, sendEmail } from "../services/emailService.js";
import { fetchWeatherData } from "../services/weatherService.js";

// Controller function to create a new user
export const createUser = async (req, res) => {
  const { email, location } = req.body;
  try {
    // Fetch weather data for the provided location
    const weatherData = await fetchWeatherData(location);

    // Generate the initial weather report
    const weatherText = await generateWeatherText(weatherData.temperature, weatherData.description, location);

    // Create a new user with the fetched weather data and generated report
    const user = new User({
      email,
      location,
      weatherData: [
        {
          date: new Date(),
          temperature: weatherData.temperature,
          description: weatherData.description,
          generatedReport: weatherText,
        },
      ],
    });

    await user.save();
    await sendEmail(user.email, weatherData, weatherText);
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};



// Controller function to update user's location
export const updateUserLocation = async (req, res) => {
  const { email } = req.params;
  const { location } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Fetch weather data for the new location
    const weatherData = await fetchWeatherData(location);

    // Generate the updated weather report
    const weatherText = await generateWeatherText(
      weatherData.temperature,
      weatherData.description,
      location
    );

    // Update user's location and generated report
    user.location = location;
    user.weatherData.push({
      date: new Date(),
      temperature: weatherData.temperature,
      description: weatherData.description,
      generatedReport: weatherText,
    });

    await user.save();
    await sendEmail(user.email, weatherData, weatherText);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

