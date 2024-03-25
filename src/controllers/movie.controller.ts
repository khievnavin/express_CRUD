import { Request, Response, NextFunction } from "express";
const movieModel = require('../models/movie')
import { MovieError } from "../utils/movieError";
import { StatusCode } from "../utils/conts/statusCode";
import { MovieService } from "../service/movieService";
// import v1  from 'uuid';

export const movieController = {
  ///-----------GetID Movie---------
  getById: async function (req: Request, res: Response, next: NextFunction) {
    console.log(req.body);
    const movieService = new MovieService();
    try {
      const m = await movieService.getMovieID(req.params.movieId);
      if (m) {
        res.json({ status: "200", message: "Movie found!!!", data: m });
      } else {
        // const error = new Error("Movie not found! Wrong IDs Movie!!");
        //     res.status(404); // Set status code
        //     next(error); // Pass the error to the error handling middleware
        const movieError = new MovieError("ID not Found", 404);
        next(movieError);
      }
    } catch (err) {
      // return res.status(404).json({ message: "Movie not found" });
      // next(new Error("Movie not found!! IDs Movie Invalid!!"));
      const movieError = new MovieError("Server Error", 500);
      next(movieError);
    }
  },

  ///-----------GetAll Movie---------
  getAll: async function (req: Request, res: Response, next: NextFunction) {
    const movieService = new MovieService();
    try {
      const movies = await movieService.getMovies();
      if(!movies){
        throw new Error("No Movie found");
      }
      res.status(StatusCode.OK).json({
        status: StatusCode.OK,
        message: "Movies list found!!!",
        data: movies,
      });
    } catch (err:any) {
      const movieError = new MovieError(err.message, 500);
      next(movieError);
    }
  },
  ///-----------Update Movie---------
  updateById: async function (req: Request, res: Response, next: NextFunction) {
    const movieService = new MovieService();
    try {
      const data = {
        name: req.body.name,
        released_on: req.body.released_on,
      };
      const m = await movieService.updateMovie(req.params.movieId, data);
      if (m) {
        res.json({
          status: StatusCode.OK,
          message: "Movie updated successfully!!!",
          data: m,
        });
      } else {
        const movieError = new MovieError(
          "Movie Updated not successfully, ID not found!!!",
          404
        );
        next(movieError);
      }
    } catch (err) {
      const movieError = new MovieError(
        "Server Error",
        StatusCode.InternalServerError
      );
      next(movieError);
    }
  },

  ///-----------Create---------
 
  create: async function (req: Request, res: Response, next: NextFunction) {
    const movieService = new MovieService();
    try {
      const { name, released_on } = req.body;
      const newMovie = await movieService.createMovie({ name, released_on });
      res.status(201).json(newMovie);
    } catch {
      const movieError = new MovieError("Failed to create user.", 500);
      next(movieError);
    }
  },

  ///-----------Delete Movie---------
  deleteById: async function (req: Request, res: Response, next: NextFunction) {
    // await movieModel.deleteOne({ _id: req.params.movieId });

    const movieService = new MovieService();
    try {
      const deleteById = await movieService.deleteMovieID(req.params.movieId);
      if (!deleteById) {
        const movieError = new MovieError("ID not found", StatusCode.NotFound);
        next(movieError);
      } else {
        res.json({
          status: StatusCode.OK,
          message: "Movie deleted successfully!!!",
          data: null,
        });
      }
    } catch (err) {
      return res
        .status(500)
        .json({
          status: StatusCode.InternalServerError,
          messsage: "Movie deleted not successfully!! ID Not Found!!",
        });
    }
  },
};
