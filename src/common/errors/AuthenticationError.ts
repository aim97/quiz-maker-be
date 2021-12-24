import { CustomError } from './CustomError';
import httpStatus from 'http-status';

export class AuthenticationError extends CustomError {
  statusCode = httpStatus.UNAUTHORIZED;
  
  constructor() {
    super("invalid token");
    this.name = 'AuthenticationError';

    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }

  serializeErrors() {
    return [{
      message: this.message,
    }];
  }
}