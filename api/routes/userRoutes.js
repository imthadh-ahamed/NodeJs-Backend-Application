import express from "express";
import {
  createUser,
  updateUserLocation,
} from "../controllers/userController.js";

const router = express.Router();

// Route to handle POST request to create a new user
router.post("/create", createUser);
// Route to handle PUT request to update user location by email
router.put("/update/:email", updateUserLocation);

export default router;
