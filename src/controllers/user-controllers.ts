import { Router } from "express";
import { addUserSchema, verifyUserSchema, deleteUserSchema } from "../schema";
import {
  addUser,
  verifyUser,
  deleteUser,
  sendVerificationEmail,
} from "../services/user-services";
import { PostgresError } from "postgres";
import type { Request, Response } from "express";
import { API_BASE_URL } from "../utils/config";

const router = Router();

const handleAddUser = async (req: Request, res: Response) => {
  try {
    const user = addUserSchema.parse(req.query);
    const { user: addedUser, code } = await addUser(user);

    const status = await sendVerificationEmail(
      API_BASE_URL,
      addedUser.name,
      addedUser.email,
      code
    );

    if (status !== 200) {
      await deleteUser(addedUser.email);
      await res.status(500).json({ error: "Something went wrong" });
    }

    await res.status(201).json(addedUser);
  } catch (err) {
    if (err instanceof PostgresError) {
      await res
        .status(409)
        .json({ error: "User with the specified email already exists" });
    } else {
      await res
        .status(500)
        .json({ error: "Something went wrong at the server" });
    }
  }
};

const handleVerifyUser = async (req: Request, res: Response) => {
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
    await res.status(500).json({ error: "Something went wrong" });
  }
};

const handleDeleteUser = async (req: Request, res: Response) => {
  try {
    const { email } = deleteUserSchema.parse(req.query);
    const deletedUser = await deleteUser(email);
    if (deletedUser)
      res.status(200).json({ message: `Removed user with email ${email}` });
    else res.status(404).json({ error: `User with email ${email} not found` });
  } catch (err) {
    await res.status(500).json({ error: "Something went wrong" });
  }
};

export { handleAddUser, handleVerifyUser, handleDeleteUser };
