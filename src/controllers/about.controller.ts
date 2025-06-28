import type { NextFunction, Request, Response } from 'express';
import aboutService from '../services/about.service';
import type { IAbout } from '../types/about.types';
import type { TypedRequestBody } from '../types/request.types';
import { ERROR_MESSAGES, HTTP_STATUS } from '../constants/http.constants';

export const fetchAbout = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const about = await aboutService.getAbout();
    res.status(HTTP_STATUS.OK).json({ data: about });
  } catch (error) {
    next(error);
  }
};

export const createAbout = async (req: TypedRequestBody<IAbout>, res: Response, next: NextFunction) => {
  try {
    const about = await aboutService.addAbout(req.body);
    res.status(HTTP_STATUS.CREATED).json({ data: about });
  } catch (error) {
    next(error);
  }
};

export const updateAbout = async (req: TypedRequestBody<Partial<IAbout>>, res: Response, next: NextFunction) => {
  try {
    if (!Object.keys(req.body).length) {
      throw new Error(ERROR_MESSAGES.NO_FIELDS_PROVIDED);
    }
    const about = await aboutService.updateAbout(req.body);
    if (!about) {
      throw new Error(ERROR_MESSAGES.UPDATE_FAILED);
    }
    res.status(HTTP_STATUS.OK).json({ data: about });
  } catch (error) {
    next(error);
  }
};

export default {
  fetchAbout,
  createAbout,
  updateAbout,
};
