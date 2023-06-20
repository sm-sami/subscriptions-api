import { Router } from "express";
import {
  handleAddUser,
  handleVerifyUser,
  handleDeleteUser,
} from "../controllers/user-controllers";
import { validateRequest } from "../middlewares/validator";
import { addUserSchema, verifyUserSchema, deleteUserSchema } from "../schema";

const router = Router();

router.post("/create", validateRequest("query", addUserSchema), handleAddUser);
router.patch(
  "/verify",
  validateRequest("query", verifyUserSchema),
  handleVerifyUser
);
router.delete(
  "/remove",
  validateRequest("query", deleteUserSchema),
  handleDeleteUser
);

export default router;
