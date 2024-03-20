import { NextFunction , Request, Response } from "express";
import mongoose from "mongoose";
import { StatusCode } from "../utils/conts/statusCode";
import { MovieError } from "../utils/movieError";

const validateMongooseId = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { movieId } = req.params;


    if (!mongoose.Types.ObjectId.isValid(movieId)) {
        // return res.status(400).json({
        //     message: "Movie not Found!! Invalid ID",
        // });
        const movieError = new MovieError('ID is not a valid',StatusCode.NotFound);
        next(movieError);
    }
    next();
};
export { validateMongooseId };