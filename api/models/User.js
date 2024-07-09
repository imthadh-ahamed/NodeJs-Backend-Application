import mongoose from "mongoose";

const weatherSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  temperature: { type: Number, required: true },
  description: { type: String, required: true },
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  weatherData: [weatherSchema],
});

export default mongoose.model("User", userSchema);
