import { Request, Response, NextFunction } from 'express';

import { AuthenticationError } from '../errors/AuthenticationError';

export const onlyStudent = (req: Request, res:Response, next: NextFunction) => { 
  if (req.currentUser && req.currentUser.role === 'student') {
    return next();
  }

  throw new AuthenticationError();
}