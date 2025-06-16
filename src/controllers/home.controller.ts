import { Request, Response } from "express";

export const getHome = (_req: Request, res: Response) => {
  res.status(200).json({ message: "This is the home." });
};