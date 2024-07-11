import express from "express";
import {
  createUser,
  updateUserLocation,
} from "../controllers/userController.js";
import { check } from "express-validator";
import { validate } from "../middlewares/validateMiddleware.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Route to handle POST request to create a new user
router.post(
  "/create",
  [
    check("email").isEmail().withMessage("Please provide a valid E-mail"),
    check("location").notEmpty().withMessage("Location is required"),
  ],
  validate,
  createUser
);

// Route to handle PUT request to update user location by email
router.put(
  "/update/:email",
  [check("location").notEmpty().withMessage("Location is required")],
  validate,
  authenticateToken,
  updateUserLocation
);

// Route to register a new user
router.post(
  "/register",
  [
    check("email").isEmail().withMessage("Please provide a valid mail"),
    check("password")
      .isLength({ min: 4 })
      .withMessage("Password must be at least 4 characters long"),
    check("location").notEmpty().withMessage("Location is required"),
  ],
  validate,
  async (req, res) => {
    const { email, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ email, password: hashedPassword });
      await user.save();
      res.status(201).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

// Route to login
router.post(
  "/login",
  [
    check("email").isEmail().withMessage("Please provide a valid email"),
    check("password").notEmpty().withMessage("Password is required"),
  ],
  validate,
  async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!User) {
        return res.status(404).send({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.json({ token });
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

export default router;
