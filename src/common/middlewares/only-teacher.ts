import { Request, Response, NextFunction } from 'express';

import { AuthenticationError } from '../../common/errors/AuthenticationError';

export const onlyTeachers = (req: Request, res:Response, next: NextFunction) => { 
  if (req.currentUser && req.currentUser.role === 'teacher') {
    return next();
  }

  throw new AuthenticationError();
}