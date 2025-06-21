import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

export const validate = <T>(schema: z.ZodSchema<T>) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) return next(result.error);
    req.body = result.data;
    next();
  };
};