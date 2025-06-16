import { Request, Response } from "express";

export const getHome = (_req: Request, res: Response) => {
  res.status(200).json({ message: "This is the home." });
};

// TODO(home.controller): Implement GET logic to fetch Home data from DB
// TODO(home.controller): Implement PUT logic to update Home content via CMS