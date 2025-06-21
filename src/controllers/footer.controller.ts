import { NextFunction, Request, Response } from 'express';
import footerService from '../services/footer.service';

export const fetchFooter = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const footer = await footerService.getFooter();
    res.status(200).json(footer);
  } catch (error) {
    next(error);
  }
};

export default {
  fetchFooter
};