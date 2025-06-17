import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = (error: unknown, _req: Request, res: Response, _next: NextFunction) => {
    let message = 'An unknown error occurred.';
    let status = 500;

    if (error instanceof Error) {
        message = error.message;

        if (error.name === 'ValidationError') status = 400;
        if (error.name === 'UnauthorizedError') status = 401;        
    }

    res.status(status).json({ error: message });
};