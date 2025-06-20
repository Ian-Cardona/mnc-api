import { NextFunction, Request, Response } from 'express';
import homeService from '../services/home.service';

const fetchHome = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const home = await homeService.getHome();
    res.status(200).json(home);
  } catch (error) {
    next(error);
  }
};

export default {
  fetchHome
};