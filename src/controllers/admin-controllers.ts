import {
  deleteAllUnverifiedUsers,
  getAllVerifiedUsers,
} from "../services/admin-services";
import type { Request, Response } from "express";

const handleGetAllVerifiedUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllVerifiedUsers();
    await res.status(200).json(users);
  } catch (err) {
    await res.status(500).json({ error: "Something went wrong" });
  }
};

const handleDeleteAllUnverifiedUsers = async (req: Request, res: Response) => {
  try {
    const users = await deleteAllUnverifiedUsers();
    await res.status(200).json({
      message: `${users} unverified users deleted successfully`,
    });
  } catch (err) {
    await res.status(500).json({ error: "Something went wrong" });
  }
};

export { handleGetAllVerifiedUsers, handleDeleteAllUnverifiedUsers };
