import { Router } from "express";
import {
  addPOC,
  getPOCsForLead,
  updatePOC,
  deletePOC,
} from "../controllers/pocController";
import authenticateToken from "../middlewares/auth";

const router = Router();

router.post("/:leadId", authenticateToken, addPOC);
router.get("/:leadId", authenticateToken, getPOCsForLead);
router.put("/:id", authenticateToken, updatePOC);
router.delete("/:id", authenticateToken, deletePOC);

export default router;
