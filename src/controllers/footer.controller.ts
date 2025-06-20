import { Request, Response } from 'express';

export const fetchFooter = (_req: Request, res: Response) => {
  // const home = getF

  res.status(200).json({ message: 'This is the footer.' });
};

export default {
  fetchFooter
};