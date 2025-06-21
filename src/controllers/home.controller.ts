import { NextFunction, Request, Response } from 'express';
import homeService from '../services/home.service';
import { TypedRequestBody } from '../types/request.types';
import { IHome } from '../types/home.types';

const fetchHome = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const home = await homeService.getHome();
    res.status(200).json(home);
  } catch (error) {
    next(error);
  }
};

const createHome = async (req: TypedRequestBody<IHome>, res: Response, next: NextFunction) => {
  try {
    const home = await homeService.addHome(req.body);
    res.status(201).json(home);
  } catch (error) {
    next(error);
  }
};

export default {
  fetchHome,
  createHome
};