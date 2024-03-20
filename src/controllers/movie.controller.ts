import { Request, Response, NextFunction } from "express";
import { movieModel } from "../models/movie";
import { MovieError } from "../utils/movieError";
import { StatusCode } from "../utils/conts/statusCode";
import { MovieService } from "../service/movieService";
// import v1  from 'uuid';

export const movieController = {

   ///-----------GetID
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

   ///-----------GetAll
  getAll: async function (req: Request, res: Response, next: NextFunction) {
    const movieService = new MovieService();
    try {
      const movies = await movieService.getMovies();
      res.json({
        status: StatusCode.OK,
        message: "Movies list found!!!",
        data: movies,
      });
    } catch (err) {
      const movieError = new MovieError("Movie Updated successfully", 500);
      next(movieError);
    }
  },
 ///-----------Update
  updateById: async function (req: Request, res: Response, next: NextFunction) {
      const movieService = new MovieService()
    try {
      
      const data =  {
        name: req.body.name,
        released_on: req.body.released_on,
      }
      const m= await movieService.updateMovie(req.params.movieId,data);
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
      const movieError = new MovieError("Server Error",StatusCode.InternalServerError);
      next(movieError);
    }
  },

   ///-----------Delete
  deleteById: async function (req: Request, res: Response, next: NextFunction) {
    // await movieModel.deleteOne({ _id: req.params.movieId });

    const movieService = new MovieService();
    try {
     const deleteById = await movieService.deleteMovieID(req.params.movieId);
     if (!deleteById){
      const movieError = new MovieError("ID not found",  StatusCode.NotFound);
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
        .json({status: StatusCode.InternalServerError , messsage: "Movie deleted not successfully!! ID Not Found!!" });
    }
  },

   ///-----------Create
  create: async function (req: Request, res: Response) {
    try{
    console.log(req.body);
    const Id = "v1";
    const m = await new movieModel({
      movieId: Id,
      name: req.body.name,
      released_on: req.body.released_on,
    }).save();
    if(m){
      throw new Error("Movie already exists")
    }
    res
      .status(StatusCode.Created)
      .json({ status: StatusCode , message: "Movie added successfully!!!", data: m });
  }catch (err){

  }
  },
};
