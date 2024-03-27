// import { Request, Response, NextFunction } from "express";
// const movieModel = require('../models/movie')
// import { MovieError } from "../utils/movieError";
// import { StatusCode } from "../utils/conts/statusCode";
// import { MovieService } from "../service/movieService";
// // import v1  from 'uuid';

// export  const movieController = {
//   ///-----------GetID Movie---------
//   getById: async function (req: Request, res: Response, next: NextFunction) {
//     console.log(req.body);
//     const movieService = new MovieService();
//     try {
//       const m = await movieService.getMovieID(req.params.movieId);
//       if (m) {
//         res.json({ status: "200", message: "Movie found!!!", data: m });
//       } else {
     
//         const movieError = new MovieError("ID not Found", 404);
//         next(movieError);
//       }
//     } catch (err) {
//       const movieError = new MovieError("Server Error", 500);
//       next(movieError);
//     }
//   },

//   ///-----------GetAll Movie---------
//   getAll: async function (req: Request, res: Response, next: NextFunction) {
//     const movieService = new MovieService();
//     try {
//       const movies = await movieService.getMovies();
//       if(!movies){
//         throw new Error("No Movie found");
//       }
//       res.status(StatusCode.OK).json({
//         status: StatusCode.OK,
//         message: "Movies list found!!!",
//         data: movies,
//       });
//     } catch (err:any) {
//       const movieError = new MovieError(err.message, 500);
//       next(movieError);
//     }
//   },
//   ///-----------Update Movie---------
//   updateById: async function (req: Request, res: Response, next: NextFunction) {
//     const movieService = new MovieService();
//     try {
//       const data = {
//         name: req.body.name,
//         released_on: req.body.released_on,
//       };
//       const m = await movieService.updateMovie(req.params.movieId, data);
//       if (m) {
//         res.json({
//           status: StatusCode.OK,
//           message: "Movie updated successfully!!!",
//           data: m,
//         });
//       } else {
//         const movieError = new MovieError(
//           "Movie Updated not successfully, ID not found!!!",
//           404
//         );
//         next(movieError);
//       }
//     } catch (err) {
//       const movieError = new MovieError(
//         "Server Error",
//         StatusCode.InternalServerError
//       );
//       next(movieError);
//     }
//   },

//   ///-----------Create---------
 
//   create: async function (req: Request, res: Response, next: NextFunction) {
//     const movieService = new MovieService();
//     try {
//       const { name, released_on } = req.body;
//       const newMovie = await movieService.createMovie({ name, released_on });
//       res.status(201).json(newMovie);
//     } catch {
//       const movieError = new MovieError("Failed to create user.", 500);
//       next(movieError);
//     }
//   },

//   ///-----------Delete Movie---------
//   deleteById: async function (req: Request, res: Response, next: NextFunction) {
//     const movieService = new MovieService();
//     try {
//       const deleteById = await movieService.deleteMovieID(req.params.movieId);
//       if (deleteById.deleteCount === 0) {
//         throw new MovieError("ID not found", StatusCode.NotFound);
  
//       } else {
//         res.status(StatusCode.OK).json({
//           status: StatusCode.OK,
//           message: "Movie deleted successfully!!!",
//           data: null,
//         });
//       }
//     } catch (err) {
//        if (err instanceof MovieError){
//          next(err)
//        }
//        next("Internal server error1")
//     }
//   },
// };
//================================================================================================


// MovieController.ts
import { Route, Get, Path, Post, Body, Put, Delete } from "tsoa";
import { MovieError } from "../utils/movieError";
import { StatusCode } from "../utils/conts/statusCode";
import { MovieService } from "../service/movieService";


interface Movie{
  movieId:string;
  name:string;
  released_on:string
}

@Route("movie")
export class MovieController {

  @Get("/")
  public async getAllMovie(): Promise<any> {
    try {
      const movieService = new MovieService();
      const movies = await movieService.getAllMovie();
      if (Array.isArray(movies) && movies.length > 0) {
        return {
          status: "success",
          message: "Movies are found",
          data: movies,
        };
      } else {
        throw new MovieError("No movies found", StatusCode.NotFound);
      }
    } catch (error: any) {
      throw new MovieError(error.message || "Failed to fetch movies", StatusCode.InternalServerError);
    }
  }

  //getByID
  @Get("/:movieId")
  public async getMovieID(@Path() movieId: string): Promise<any> { // Use @Path decorator for parameter mapping
    try {
      const movieService = new MovieService();
      const movie = await movieService.getMovieID(movieId); // Assuming you have a method named getMovieID in your MovieService
      if (movie) {
        return {
          status: "success",
          message: "Movie is found",
          data: movie,
        };
      } else {
        throw new MovieError("Movie not found", StatusCode.NotFound);
      }
    } catch (error: any) {
      throw new MovieError(error.message || "Failed to retrieve movie", StatusCode.InternalServerError); // Adjust status code as per your requirement
    }
  }
  //Post
  @Post("/")
  public async createMovie(@Body() movie:Movie): Promise<any>{
    try {
      const movieService = new MovieService();
      const { name, released_on } = movie;
      const newMovie = await movieService.createMovie({ name, released_on });
      return newMovie;
    } catch (error: any) {
      throw new MovieError(error.message || "Failed to create movie", StatusCode.InternalServerError); // Adjust status code as per your requirement
    }
  }
  @Put("/:movieId")
  public async updateMovie(@Path() movieId: string, @Body() movie:Movie): Promise<any>{
    try {
      const movieService = new MovieService();
      const { name, released_on } = movie;
      const updatedMovie = await movieService.updateMovie(movieId, { name, released_on });
      return updatedMovie;
    } catch (error: any) {
      throw new MovieError(error.message || "Failed to update movie", StatusCode.InternalServerError); // Adjust status code as per your requirement
    }
  }

  @Delete("/:movieId")
  public async deleteMovieID(@Path() movieId: string): Promise<any>{
    try {
      const movieService = new MovieService();
      const deletedMovie = await movieService.deleteMovieID(movieId);
      return deletedMovie;
    } catch (error: any) {
      throw new MovieError(error.message || "Failed to delete movie", StatusCode.InternalServerError); // Adjust status code as per your requirement
    }
  }
}






