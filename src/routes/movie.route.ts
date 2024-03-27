// import express, { Request, Response, NextFunction } from "express";
// import { movieController } from "../controllers/movie.controller";
// import { validateMongooseId } from "../middleware/mongoose";
// import { validateUserData } from "../middleware/movieValidation";
// import movieSchema from "../schemas/useSchema";

// export const movieRouter = express.Router();

// movieRouter.get("/", movieController.getAll);
// movieRouter.post(
//   "/",
  
//     validateUserData(movieSchema),

//   movieController.create
// );
// movieRouter.get("/:movieId", validateMongooseId, movieController.getById);
// movieRouter.put(
//   "/:movieId",
//     validateUserData( movieSchema)
//   ,
//   movieController.updateById
// );
// movieRouter.delete("/:movieId", movieController.deleteById);


import express, { Request, Response, NextFunction } from "express";
import { MovieController } from "../controllers/movie.controller";
import { any } from "zod";
// import { ValidateMongooseId } from "../middleware/mongoose"; // Adjust this import as per your middleware implementation
// import { ValidateUserData } from "../middleware/movieValidation"; // Adjust this import as per your middleware implementation

const movieRouter = express.Router();
const movieController = new MovieController();

//Get
movieRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const movie = await movieController.getAllMovie();
    res.status(200).json(movie);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

//GetbyId
movieRouter.get('/:movieId', async (req, res) => {
  try{
    const movie = await movieController.getMovieID(req.params.movieId);
    res.status(200).json(movie);
  }catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

//Post
movieRouter.post('/' ,async (req, res) => {
  try{
    const movie = await movieController.createMovie(req.body);
    res.status(201).json(movie);
  }catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

//Put
movieRouter.put('/:movieId', async (req, res) => {
  try{
    const movie = await movieController.updateMovie(req.params.movieId, req.body);
    res.status(200).json(movie);
  }catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

//Delete
movieRouter.delete('/:movieId', async (req, res) => {
  try{
    const movie = await movieController.deleteMovieID(req.params.movieId);
    res.status(200).json(movie);
  }catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default movieRouter;





