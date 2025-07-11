import type { NextFunction, Request, Response } from 'express';
import footerService from '../services/footer.service';
import type { IFooter, IFooterFormInput } from '../types/footer.type';
import type { TypedRequestBody } from '../types/request.type';
import { ERROR_MESSAGES, HTTP_STATUS } from '../constants/http.constants';

export const fetchFooter = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const footer = await footerService.getFooter();
    res.status(HTTP_STATUS.OK).json({ data: footer });
  } catch (error) {
    next(error);
  }
};

export const createFooter = async (req: TypedRequestBody<IFooter>, res: Response, next: NextFunction) => {
  try {
    const footer = await footerService.addFooter(req.body);
    res.status(HTTP_STATUS.CREATED).json({ data: footer });
  } catch (error) {
    next(error);
  }
};

export const updateFooter = async (req: TypedRequestBody<Partial<IFooter>>, res: Response, next: NextFunction) => {
  try {
    if (!Object.keys(req.body).length) {
      throw new Error(ERROR_MESSAGES.NO_FIELDS_PROVIDED);
    }
    const footer = await footerService.updateFooter(req.body);
    if (!footer) {
      throw new Error(ERROR_MESSAGES.UPDATE_FAILED);
    }
    res.status(HTTP_STATUS.OK).json({ data: footer });
  } catch (error) {
    next(error);
  }
};

export const createEmail = async (req: TypedRequestBody<IFooterFormInput>, res: Response, next: NextFunction) => {
  try {
    if (!req.body.emailer || !req.body.contact || !req.body.message) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        error: ERROR_MESSAGES.INVALID_INPUT,
      });
      return;
    }

    await footerService.addEmail(req.body);
    res.status(HTTP_STATUS.CREATED).json({ data: req.body });
  } catch (error) {
    next(error);
  }
};

export default {
  fetchFooter,
  createFooter,
  updateFooter,
  createEmail,
};
