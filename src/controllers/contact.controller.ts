import type { NextFunction, Request, Response } from 'express';
import contactService from '../services/contact.service';
import type { IContact } from '../types/contact.type';
import type { TypedRequestBody } from '../types/request.type';
import { ERROR_MESSAGES, HTTP_STATUS } from '../constants/http.constants';

export const fetchContact = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const contact = await contactService.getContact();
    res.status(HTTP_STATUS.OK).json({ data: contact });
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req: TypedRequestBody<IContact>, res: Response, next: NextFunction) => {
  try {
    const contact = await contactService.addContact(req.body);
    res.status(HTTP_STATUS.CREATED).json({ data: contact });
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req: TypedRequestBody<Partial<IContact>>, res: Response, next: NextFunction) => {
  try {
    if (!Object.keys(req.body).length) {
      throw new Error(ERROR_MESSAGES.NO_FIELDS_PROVIDED);
    }
    const contact = await contactService.updateContact(req.body);
    if (!contact) {
      throw new Error(ERROR_MESSAGES.UPDATE_FAILED);
    }
    res.status(HTTP_STATUS.OK).json({ data: contact });
  } catch (error) {
    next(error);
  }
};

export default {
  fetchContact,
  createContact,
  updateContact,
};
