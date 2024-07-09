import User from "../models/User.js";

export const getWeatherData = async (req, res) => {
  const { email, date } = req.params;
  try {
    const user = await User.findOne({ email });
    const weatherData = user.weatherData.filter(
      (data) => data.date.toISOString().split("T")[0] === date
    );
    res.status(200).send(weatherData);
  } catch (error) {
    res.status(400).send(error);
  }
};
