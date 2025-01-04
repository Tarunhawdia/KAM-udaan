import { Router } from "express";
import {
  addPOC,
  getPOCsForLead,
  updatePOC,
  deletePOC,
} from "../controllers/pocController";
import authenticateToken from "../middlewares/auth";

const router = Router();

router.post("/:leadId", addPOC);
router.get("/:leadId", getPOCsForLead);
router.put("/:id", updatePOC);
router.delete("/:id", deletePOC);

export default router;
