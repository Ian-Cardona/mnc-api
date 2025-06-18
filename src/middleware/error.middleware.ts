import { Request, Response, NextFunction } from 'express';
import logger from './logger.middleware';

export const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let message = 'An unknown error occurred.';
  let status = 500;

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

    logger.error(`[${error.name}] ${error.message}`);
  } else {
    logger.error(`Unknown error: ${JSON.stringify(error)}`);
  }

  res.status(status).json({ error: message });
};