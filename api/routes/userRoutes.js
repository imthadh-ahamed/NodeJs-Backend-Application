import express from "express";
import {
  createUser,
  updateUserLocation,
} from "../controllers/userController.js";
import { check } from "express-validator";
import { validate } from "../middlewares/validateMiddleware.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Route to handle POST request to create a new user
router.post(
  "/create",
  [
    check("email").isEmail().withMessage("Please provide a valid E-mail"),
    check("location").notEmpty().withMessage("Location is required"),
  ],
  validate,
  authenticateToken,
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

export default router;
