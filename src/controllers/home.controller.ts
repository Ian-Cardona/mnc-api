import type { NextFunction, Request, Response } from 'express';
import homeService from '../services/home.service';
import type { TypedRequestBody } from '../types/request.type';
import type { IHome } from '../types/home.type';
import { ERROR_MESSAGES, HTTP_STATUS } from '../constants/http.constants';

const fetchHome = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const home = await homeService.getHome();
    res.status(HTTP_STATUS.OK).json({ data: home });
  } catch (error) {
    next(error);
  }
};

const createHome = async (req: TypedRequestBody<IHome>, res: Response, next: NextFunction) => {
  try {
    const home = await homeService.addHome(req.body);
    res.status(HTTP_STATUS.CREATED).json({ data: home });
  } catch (error) {
    next(error);
  }
};

const updateHome = async (req: TypedRequestBody<Partial<IHome>>, res: Response, next: NextFunction) => {
  try {
    if (!Object.keys(req.body).length) {
      throw new Error(ERROR_MESSAGES.NO_FIELDS_PROVIDED);
    }
    const home = await homeService.updateHome(req.body);
    if (!home) {
      throw new Error(ERROR_MESSAGES.UPDATE_FAILED);
    }
    res.status(HTTP_STATUS.OK).json({ data: home });
  } catch (error) {
    next(error);
  }
};

export default {
  fetchHome,
  createHome,
  updateHome,
};
