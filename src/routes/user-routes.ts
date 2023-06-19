import { Router } from "express";
import {
  addUserHandler,
  verifyUserHandler,
  deleteUserHandler,
} from "../controllers/user-controllers";

const router = Router();

router.post("/create", addUserHandler);
router.patch("/verify", verifyUserHandler);
router.delete("/remove", deleteUserHandler);

export default router;
