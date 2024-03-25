import express, { Request, Response, NextFunction } from "express";
import { movieController } from "../controllers/movie.controller";
import { validateMongooseId } from "../middleware/mongoose";
import { validateUserData } from "../middleware/movieValidation";
import movieSchema from "../schemas/useSchema";

export const movieRouter = express.Router();

movieRouter.get("/", movieController.getAll);
movieRouter.post(
  "/",
  
    validateUserData(movieSchema),

  movieController.create
);
movieRouter.get("/:movieId", validateMongooseId, movieController.getById);
movieRouter.put(
  "/:movieId",
    validateUserData( movieSchema)
  ,
  movieController.updateById
);
movieRouter.delete("/:movieId", movieController.deleteById);
