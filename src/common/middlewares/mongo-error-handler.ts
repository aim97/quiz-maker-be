import {MongoError} from 'mongodb';
import {Request, Response, NextFunction} from 'express';


import { DatabaseValidationError } from '../errors/DatabaseValidationError';
import { DatabaseError } from '../errors/DatabaseError';

export async function mongoErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (err instanceof MongoError) {
    switch (err.code) {
      case 11000:
        console.log(err.errmsg);
        console.log(err.errorLabels);
        const field = err.errmsg.split('index: ')[1].split('_')[0];
        const value = err.errmsg.split('dup key: ')[1].split('"')[1];
        throw new DatabaseValidationError([
          { 
            field: field,
            message: value,
          },
        ]);
      default:
        throw new DatabaseError();
    }
  }

  throw err;
}