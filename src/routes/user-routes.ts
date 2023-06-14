import { Router } from "express";
import { z } from "zod";
import {
  addUserSchema,
  verifyUserSchema,
  removeUserSchema,
} from "../schema/user-schema";
import {
  addUser,
  verifyUser,
  deleteUser,
} from "../controllers/user-controllers";
import { handleValidationError } from "../utils/errors";
import { PostgresError } from "postgres";
import type { Request, Response } from "express";

const router = Router();

router.post("/create", async (req: Request, res: Response) => {
  try {
    const user = addUserSchema.parse(req.query);
    const addedUser = await addUser(user);
    await res.status(201).json(addedUser);
  } catch (err) {
    if (err instanceof z.ZodError) {
      const error = handleValidationError(err);
      await res.status(400).json({ error });
    } else if (err instanceof PostgresError) {
      await res
        .status(409)
        .json({ error: "User with the specified email already exists" });
    } else {
      await res
        .status(500)
        .json({ error: "Something went wrong at the server" });
    }
  }
});

router.patch("/verify", async (req, res) => {
  try {
    const { email, code } = verifyUserSchema.parse(req.query);
    if (!code) {
      res.status(403).json({ error: "Verification code is required" });
      return;
    }
    const isVerified = await verifyUser(email, code);
    if (isVerified)
      await res
        .status(200)
        .json({ message: `User with email ${email} is verified` });
    else await res.status(401).json({ error: "Invalid verification code" });
  } catch (err) {
    if (err instanceof z.ZodError) {
      const error = handleValidationError(err);
      await res.status(400).json({ error });
    } else {
      await res.status(500).json({ error: "Something went wrong" });
    }
  }
});

router.delete("/remove", async (req, res) => {
  try {
    const { email } = removeUserSchema.parse(req.query);
    const deletedUser = await deleteUser(email);
    if (deletedUser)
      res.status(200).json({ message: `Removed user with email ${email}` });
    else res.status(404).json({ error: `User with email ${email} not found` });
  } catch (err) {
    if (err instanceof z.ZodError) {
      const error = handleValidationError(err);
      await res.status(400).json({ error });
    } else {
      await res.status(500).json({ error: "Something went wrong" });
    }
  }
});

export default router;
