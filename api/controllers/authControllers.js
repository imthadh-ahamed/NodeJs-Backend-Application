import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Auth from "../models/auth.js";

// Controller function to register a new user
export const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const auth = new Auth({ email, password: hashedPassword });
    await auth.save();
    res.status(201).send(auth);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Controller function to login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const auth = await Auth.findOne({ email });
    if (!auth) {
      return res.status(404).send({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, auth.password);
    if (!isMatch) {
      return res.status(400).send({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ email: auth.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    res.status(400).send(error);
  }
};
