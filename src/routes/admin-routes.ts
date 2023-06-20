import { Router } from "express";
import {
  handleGetAllVerifiedUsers,
  handleDeleteAllUnverifiedUsers,
} from "../controllers/admin-controllers";

const router = Router();

router.get("/all-verified", handleGetAllVerifiedUsers);
router.delete("/unverified", handleDeleteAllUnverifiedUsers);

export default router;
