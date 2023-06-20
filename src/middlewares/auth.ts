import { Request, Response, NextFunction } from "express";
import { AUTH_TOKEN } from "../utils/config";

export const authenticateAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  if (authorization === `Bearer ${AUTH_TOKEN}`) {
    next();
  } else {
    res.status(401).json({
      error: "You are not authorized to do this operation",
    });
  }
};
