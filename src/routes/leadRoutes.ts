import express from "express";
import { addLead, getLeadsForToday } from "../controllers/leadController";

const router = express.Router();

// Route for adding a new lead
router.post("/add", addLead);

// Route for getting leads that need calls today
router.get("/calls-today", getLeadsForToday);

export default router;
