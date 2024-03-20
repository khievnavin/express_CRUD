import { NextFunction, Request, Response } from 'express';
import { MovieError } from '../utils/movieError';
import z, { ZodError } from 'zod'


// Middleware function for validating user data using Zod schema
export const validateUserData = (req: Request, res: Response, next: NextFunction , ValidatinSchema:z.ZodObject<any, any>) => {
  try {
    ValidatinSchema.parse(req.body);
    next();
  } catch {
   next(new Error('Input Tittle Again, Tittle More Than 3 characters'));
    }
};