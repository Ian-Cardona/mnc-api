import type { NextFunction, Request, Response } from 'express';
import homeService from '../services/home.service';
import type { TypedRequestBody } from '../types/request.types';
import type { IHome } from '../types/home.types';

const fetchHome = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const home = await homeService.getHome();
    res.status(200).json({ data: home });
  } catch (error) {
    next(error);
  }
};

const createHome = async (req: TypedRequestBody<IHome>, res: Response, next: NextFunction) => {
  try {
    const home = await homeService.addHome(req.body);
    res.status(201).json({ data: home });
  } catch (error) {
    next(error);
  }
};

const updateHome = async (req: TypedRequestBody<Partial<IHome>>, res: Response, next: NextFunction) => {
  try {
    if (!Object.keys(req.body).length) {
      throw new Error('No fields provided for update');
    }
    const home = await homeService.updateHome(req.body);
    if (!home) {
      throw new Error('Home not found or update failed');
    }
    res.status(200).json({ data: home });
  } catch (error) {
    next(error);
  }
};

export default {
  fetchHome,
  createHome,
  updateHome,
};
