import express from "express";
import {
  addLead,
  getLeadsForToday,
  trackPerformance,
} from "../controllers/leadController";

const router = express.Router();

// Route for adding a new lead
router.post("/add", addLead);

// Route for getting leads requiring calls today
router.get("/calls-today", getLeadsForToday);

// Route for tracking lead performance (well-performing and underperforming)
router.get("/performance", trackPerformance);

export default router;
