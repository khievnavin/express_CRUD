import { NextFunction, Request, Response } from "express";
import { MovieError } from "../utils/movieError";
import z, { ZodError } from "zod";

// Middleware function for validating user data using Zod schema
export const validateUserData =(schema: z.AnyZodObject) =>(
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    schema.parse(req.body);
    next();
  } catch {
    next(new Error("Tittle More Than 3 characters"));
  }
};
