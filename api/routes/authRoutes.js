import express from "express";
import { check } from "express-validator";
import { validate } from "../middlewares/validateMiddleware.js";
import { loginUser, registerUser } from "../controllers/authControllers.js";

const router = express.Router();

// Route to register a new user
router.post(
  "/register",
  [
    check("email").isEmail().withMessage("Please provide a valid email"),
    check("password")
      .isLength({ min: 4 })
      .withMessage("Password must be at least 4 characters long"),
  ],
  validate,
  registerUser
);

// Route to login
router.post(
  "/login",
  [
    check("email").isEmail().withMessage("Please provide a valid email"),
    check("password").notEmpty().withMessage("Password is required"),
  ],
  validate,
  loginUser
);

export default router;
