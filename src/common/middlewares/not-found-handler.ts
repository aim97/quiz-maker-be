import { Request, Response } from 'express';
import { RouteNotFoundError } from '../errors/RouteNotFoundError';

export const notFoundHandler = (req: Request, res: Response) => {
  throw new RouteNotFoundError(`Route '${req.method}:${req.originalUrl}' is not found`);
};
