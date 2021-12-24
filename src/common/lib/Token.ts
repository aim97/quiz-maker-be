import jwt from 'jsonwebtoken';

import { AuthenticationError } from '../errors/AuthenticationError';

export interface TokenPayload {
  id: string;
  email: string;
  role: "teacher"|"student"
}

export class Token {
  static generateToken(user: TokenPayload): string {
    return jwt.sign( user, process.env.JWT_KEY as string);
  }

  static getPayload(token: string): TokenPayload {
    try {
      return jwt.verify(token, process.env.JWT_KEY as string) as TokenPayload;
    } catch (err) {
      throw new AuthenticationError();
    }
  }
}