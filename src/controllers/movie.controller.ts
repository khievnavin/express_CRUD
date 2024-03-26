import { Request, Response, NextFunction } from "express";
const movieModel = require('../models/movie')
import { MovieError } from "../utils/movieError";
import { StatusCode } from "../utils/conts/statusCode";
import { MovieService } from "../service/movieService";
// import v1  from 'uuid';

export  const movieController = {
  ///-----------GetID Movie---------
  getById: async function (req: Request, res: Response, next: NextFunction) {
    console.log(req.body);
    const movieService = new MovieService();
    try {
      const m = await movieService.getMovieID(req.params.movieId);
      if (m) {
        res.json({ status: "200", message: "Movie found!!!", data: m });
      } else {
     
        const movieError = new MovieError("ID not Found", 404);
        next(movieError);
      }
    } catch (err) {
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
    const movieService = new MovieService();
    try {
      const deleteById = await movieService.deleteMovieID(req.params.movieId);
      if (deleteById.deleteCount === 0) {
        throw new MovieError("ID not found", StatusCode.NotFound);
  
      } else {
        res.status(StatusCode.OK).json({
          status: StatusCode.OK,
          message: "Movie deleted successfully!!!",
          data: null,
        });
      }
    } catch (err) {
       if (err instanceof MovieError){
         next(err)
       }
       next("Internal server error1")
    }
  },
};




// import { Request, Response, NextFunction } from "express";
// import { MovieError } from "../utils/movieError";
// import { StatusCode } from "../utils/conts/statusCode";
// import { MovieService } from "../service/movieService";

// export class MovieController {
//   private movieService: MovieService;

//   constructor() {
//     this.movieService = new MovieService();
//   }

//   // Get Movie by ID
//   public async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
//     try {
//       const movieId = req.params.movieId;
//       const movie = await this.movieService.getMovieID(movieId);

//       if (movie) {
//         res.status(StatusCode.OK)
//         .json({ message: "Movie found!!!", data: movie });
//       } else {
//         throw new MovieError("ID not Found", StatusCode.NotFound);
//       }
//     } catch (err) {
//       next(err instanceof MovieError ? err : new MovieError("Server Error", StatusCode.InternalServerError));
//     }
//   }

//   // Get All Movies
//   public async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
//     try {
//       const movies = await this.movieService.getMovies();

//       if (!movies) {
//         throw new Error("No Movie found");
//       }

//       res.status(StatusCode.OK).json({
//         status: StatusCode.OK,
//         message: "Movies list found!!!",
//         data: movies,
//       });
//     } catch (err: any) {
//       next(new MovieError(err.message, StatusCode.InternalServerError));
//     }
//   }

//   // Update Movie by ID
//   public async updateById(req: Request, res: Response, next: NextFunction): Promise<void> {
//     try {
//       const movieId = req.params.movieId;
//       const data = {
//         name: req.body.name,
//         released_on: req.body.released_on,
//       };

//       const updatedMovie = await this.movieService.updateMovie(movieId, data);

//       if (updatedMovie) {
//         res.status(StatusCode.Accepted).json({
//           message: "Movie updated successfully!!!",
//           data: updatedMovie,
//         });
//       } else {
//         throw new MovieError("Movie Updated not successfully, ID not found!!!", StatusCode.NotFound);
//       }
//     } catch (err) {
//       next(err instanceof MovieError ? err : new MovieError("Server Error", StatusCode.InternalServerError));
//     }
//   }

//   // Create Movie
//   public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
//     try {
//       const { name, released_on } = req.body;
//       const newMovie = await this.movieService.createMovie({ name, released_on });
//       res.status(StatusCode.Created).json(newMovie);
//     } catch (err) {
//       next(new MovieError("Failed to create movie.", StatusCode.InternalServerError));
//     }
//   }

//   // Delete Movie by ID
//   public async deleteById(req: Request, res: Response, next: NextFunction): Promise<void> {
//     try {
//       const movieId = req.params.movieId;
//       const deleteResult = await this.movieService.deleteMovieID(movieId);

//       if (deleteResult.deleteCount === 0) {
//         throw new MovieError("ID not found", StatusCode.NoContent);
//       }

//       res.status(StatusCode.NoContent).json({
      
//         message: "Movie deleted successfully!!!",
//         data: null,
//       });
//     } catch (err) {
//       next(err instanceof MovieError ? err : new MovieError("Internal server error", StatusCode.InternalServerError));
//     }
//   }
// }
