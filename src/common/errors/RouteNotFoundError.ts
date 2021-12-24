import { CustomError } from './CustomError';

export class RouteNotFoundError extends CustomError {
  statusCode = 404;

  constructor(message: string) {
    super(message);
    this.name = "RouteNotFoundError";

    Object.setPrototypeOf(this, RouteNotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}