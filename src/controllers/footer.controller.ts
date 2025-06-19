import { Request, Response } from 'express';

export const getFooter = (_req: Request, res: Response) => {
  res.status(200).json({ message: 'This is the footer.' });
};
