import type { NextFunction, Request, Response } from 'express';
import guidesService from '../services/guides.service';
import type { TypedRequestBody } from '../types/request.type';
import type { IGuides } from '../types/guides.type';
import { ERROR_MESSAGES, HTTP_STATUS } from '../constants/http.constants';

const fetchGuides = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const guides = await guidesService.getGuides();
    res.status(HTTP_STATUS.OK).json({ data: guides });
  } catch (error) {
    next(error);
  }
};

const createGuides = async (req: TypedRequestBody<IGuides>, res: Response, next: NextFunction) => {
  try {
    const guides = await guidesService.addGuides(req.body);
    res.status(HTTP_STATUS.CREATED).json({ data: guides });
  } catch (error) {
    next(error);
  }
};

const updateGuides = async (req: TypedRequestBody<Partial<IGuides>>, res: Response, next: NextFunction) => {
  try {
    if (!Object.keys(req.body).length) {
      throw new Error(ERROR_MESSAGES.NO_FIELDS_PROVIDED);
    }
    const guides = await guidesService.updateGuides(req.body);
    if (!guides) {
      throw new Error(ERROR_MESSAGES.UPDATE_FAILED);
    }
    res.status(HTTP_STATUS.OK).json({ data: guides });
  } catch (error) {
    next(error);
  }
};

export default {
  fetchGuides,
  createGuides,
  updateGuides,
};
