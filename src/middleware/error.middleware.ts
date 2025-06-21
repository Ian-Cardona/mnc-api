import type { Request, Response, NextFunction } from 'express';
import logger from '../config/logger.config';
import { ZodError } from 'zod';

export const errorMiddleware = (
  error: Error | ZodError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  let status = 500;
  let message = 'An unknown error occurred.';
  let name = 'Error';

  if (error instanceof ZodError) {
    status = 400;
    message = error.errors[0].message;
    name = error.name;
  } else if (error instanceof Error) {
    message = error.message;
    name = error.name;

    if (error.name === 'UnauthorizedError') {
      status = 401;
    }

    logger.error({
      name,
      message,
      status,
      stack: error.stack,
    });

    if (process.env.NODE_ENV !== 'production') {
      console.error(error);
    }
  } else {
    logger.error({ name: 'UnknownError', error });
  }

  res.status(status).json({
    error: {
      name,
      message,
      status,
    },
  });
};
