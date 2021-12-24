import { CustomError } from './CustomError';
import { ValidationError } from 'express-validator';

export class RequestValidationError extends CustomError {
  statusCode = 400;
  
  constructor(private errors: ValidationError[]) {
    super("Invalid user input");
    this.name = 'RequestValidationError';

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map(err => ({ message: err.msg, field: err.param }));
  }
}