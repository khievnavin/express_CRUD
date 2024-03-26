import { Request, Response, NextFunction } from 'express';
import { BaseCustomError } from '../utils/conts/BaseError';

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction){
  
  if(err instanceof BaseCustomError){
      const statusCode =  err.statusCode;

      //res to client 
      res.status(statusCode).json({
        statusCode: statusCode,
        message: err.message,
      });
    }
    next()
}
export default errorHandler;
