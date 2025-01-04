import { Router } from "express";
import { addLead, trackPerformance } from "../controllers/leadController";
import { getLeadsForToday } from "../controllers/leadController";
import { getAllLeads } from "../controllers/leadController";

const router = Router();

// Route for adding a new lead
router.post("/add", addLead);

// Route for getting leads requiring calls today
router.get("/calls-today", getLeadsForToday);

// Route for tracking lead performance (well-performing and underperforming)
router.get("/performance", trackPerformance);

// Route for fetching all leads
router.get("/", getAllLeads);

export default router;
