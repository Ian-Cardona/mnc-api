import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger.config';

export const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let status = 500;
  let message = 'An unknown error occurred.';

  if (error instanceof Error) {
    message = error.message;

    switch (error.name) {
      case 'ValidationError':
        status = 400;
        break;
      case 'UnauthorizedError':
        status = 401;
        break;
    }

    logger.error({
      name: error.name,
      message,
      status,
      stack: error.stack,
    });

    if (process.env.NODE_ENV !== 'production') {
      console.error(error.stack);
    }
  } else {
    logger.error({ name: 'UnknownError', message: JSON.stringify(error), status });
  }

  res.status(status).json({ error: message });
};