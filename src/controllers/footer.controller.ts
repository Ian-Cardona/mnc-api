import type { NextFunction, Request, Response } from 'express';
import footerService from '../services/footer.service';
import type { IFooter } from '../types/footer.types';
import type { TypedRequestBody } from '../types/request.types';

export const fetchFooter = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const footer = await footerService.getFooter();
    res.status(200).json({ data: footer });
  } catch (error) {
    next(error);
  }
};

export const createFooter = async (req: TypedRequestBody<IFooter>, res: Response, next: NextFunction) => {
  try {
    const footer = await footerService.addFooter(req.body);
    res.status(201).json({ data: footer });
  } catch (error) {
    next(error);
  }
};

export const updateFooter = async (req: TypedRequestBody<Partial<IFooter>>, res: Response, next: NextFunction) => {
  try {
    if (!Object.keys(req.body).length) {
      throw new Error('No fields provided for update');
    }
    const footer = await footerService.updateFooter(req.body);
    if (!footer) {
      throw new Error('Footer not found or update failed');
    }
    res.status(200).json({ data: footer });
  } catch (error) {
    next(error);
  }
};

export default {
  fetchFooter,
  createFooter,
  updateFooter,
};
