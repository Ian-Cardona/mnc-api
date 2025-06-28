import type { NextFunction, Request, Response } from 'express';
import type { IServices } from '../types/services.types';
import type { TypedRequestBody } from '../types/request.types';
import { ERROR_MESSAGES, HTTP_STATUS } from '../constants/http.constants';
import servicesService from '../services/services.service';

export const fetchServices = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const services = await servicesService.getServices();
    res.status(HTTP_STATUS.OK).json({ data: services });
  } catch (error) {
    next(error);
  }
};

export const createServices = async (req: TypedRequestBody<IServices>, res: Response, next: NextFunction) => {
  try {
    const services = await servicesService.addServices(req.body);
    res.status(HTTP_STATUS.CREATED).json({ data: services });
  } catch (error) {
    next(error);
  }
};

export const updateServices = async (req: TypedRequestBody<Partial<IServices>>, res: Response, next: NextFunction) => {
  try {
    if (!Object.keys(req.body).length) {
      throw new Error(ERROR_MESSAGES.NO_FIELDS_PROVIDED);
    }
    const services = await servicesService.updateServices(req.body);
    if (!services) {
      throw new Error(ERROR_MESSAGES.UPDATE_FAILED);
    }
    res.status(HTTP_STATUS.OK).json({ data: services });
  } catch (error) {
    next(error);
  }
};

export default {
  fetchServices,
  createServices,
  updateServices,
};
