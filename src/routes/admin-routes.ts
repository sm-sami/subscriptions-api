import { Router } from "express";
import {
  deleteAllUnverifiedUsersHandler,
  getAllVerifiedUsersHandler,
} from "../controllers/admin-controllers";

const router = Router();

router.get("/all-verified", getAllVerifiedUsersHandler);
router.delete("/unverified", deleteAllUnverifiedUsersHandler);

export default router;
