import { Request, Response, NextFunction } from 'express';
import { Token, TokenPayload } from '../lib/Token';

declare global {
  namespace Express {
    interface Request {
      currentUser?: TokenPayload;
    }
  }
}

export const currentUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.jwt) {
    return next();
  }
  // extract the jwt token from the cookie
  const token = req.session.jwt;
  try {
    const user = Token.getPayload(token);
    req.currentUser = user;
  } catch (err) {} // ignore errors
  next();
}