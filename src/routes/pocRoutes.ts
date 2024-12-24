import express from "express";
import {
  addPOC,
  getPOCsForLead,
  updatePOC,
  deletePOC,
} from "../controllers/pocController";

const router = express.Router();

// Route to add a new POC for a lead
router.post("/:leadId/pocs", addPOC);

// Route to get all POCs for a specific lead
router.get("/:leadId/pocs", getPOCsForLead);

// Route to update a specific POC
router.put("/pocs/:id", updatePOC);

// Route to delete a specific POC
router.delete("/pocs/:id", deletePOC);

export default router;
