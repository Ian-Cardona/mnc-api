import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger.config';
import { ZodError } from 'zod';

export const errorMiddleware = (
  error: Error | ZodError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  let status = 500;
  let message = 'An unknown error occurred.';

  if (error instanceof ZodError) {
    status = 400;
    message = error.errors[0].message;
  }

  if (error instanceof Error) {
    message = error.message;
    if (error.name === 'UnauthorizedError') status = 401;

    if (process.env.NODE_ENV !== 'production') {
      console.error(error);
    }
    
    logger.error({
      name: error.name,
      message,
      status,
      stack: error.stack,
    });
  }

  res.status(status).json({ error: message });
};