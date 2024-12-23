import express from "express";
import { addInteraction } from "../controllers/interactionController";

const router = express.Router();

// Add a new interaction
router.post("/add", addInteraction);

export default router;
