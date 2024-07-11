import mongoose from "mongoose";

// Define schema for auth data
const authSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default mongoose.model("Auth", authSchema);
