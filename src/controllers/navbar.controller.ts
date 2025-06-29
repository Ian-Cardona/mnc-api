import type { NextFunction, Request, Response } from 'express';
import navbarService from '../services/navbar.service';
import { ERROR_MESSAGES, HTTP_STATUS } from '../constants/http.constants';
import type { TypedRequestBody } from '../types/request.type';
import type { INavBar } from '../types/navbar.type';

const fetchNavBar = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const navBar = await navbarService.getNavBar();
    res.status(HTTP_STATUS.OK).json({ data: navBar });
  } catch (error) {
    next(error);
  }
};

const createNavBar = async (req: TypedRequestBody<INavBar>, res: Response, next: NextFunction) => {
  try {
    const navBar = await navbarService.addNavBar(req.body);
    res.status(HTTP_STATUS.CREATED).json({ data: navBar });
  } catch (error) {
    next(error);
  }
};

const updateNavBar = async (req: TypedRequestBody<Partial<INavBar>>, res: Response, next: NextFunction) => {
  try {
    if (!Object.keys(req.body).length) {
      throw new Error(ERROR_MESSAGES.NO_FIELDS_PROVIDED);
    }
    const navBar = await navbarService.updateNavBar(req.body);
    if (!navBar) {
      throw new Error(ERROR_MESSAGES.UPDATE_FAILED);
    }
    res.status(HTTP_STATUS.OK).json({ data: navBar });
  } catch (error) {
    next(error);
  }
};

export default {
  fetchNavBar,
  createNavBar,
  updateNavBar,
};
