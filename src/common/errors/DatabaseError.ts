import { CustomError } from './CustomError';

export class DatabaseError extends CustomError {
  statusCode = 500;
  
  constructor() {
    super("Database is down");
    this.name = 'DatabaseError';

    Object.setPrototypeOf(this, DatabaseError.prototype);
  }

  serializeErrors() {
    return [];
  }
}