import { CustomError } from './CustomError';

export class DatabaseValidationError extends CustomError {
  statusCode = 400;
  
  constructor(private errors: { message: string, field: string }[]) {
    super("Invalid user input");
    this.name = 'DatabaseValidationError';

    Object.setPrototypeOf(this, DatabaseValidationError.prototype);
  }

  serializeErrors() {
    return this.errors;
  }
}