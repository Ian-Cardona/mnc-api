import { NextFunction, Request, Response } from 'express';
import footerService from '../services/footer.service';
import { IFooter } from '../types/footer.types';
import { TypedRequestBody } from '../types/request.types';

export const fetchFooter = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const footer = await footerService.getFooter();
    res.status(200).json(footer);
  } catch (error) {
    next(error);
  }
};

const createFooter = async (req: TypedRequestBody<IFooter>, res: Response, next: NextFunction) => {
  try {
    const footer = await footerService.addFooter(req.body);
    res.status(201).json(footer);
  } catch (error) {
    next(error);
  }
};

export default {
  fetchFooter,
  createFooter
};