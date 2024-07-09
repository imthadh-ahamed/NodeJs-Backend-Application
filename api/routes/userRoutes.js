import express from "express";
import {
  createUser,
  updateUserLocation,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/create", createUser);
router.put("/update/:email", updateUserLocation);

export default router;
