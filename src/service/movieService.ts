
import { MovieRepo } from "../repositories/movieRepo";
import { Options } from "../repositories/movieRepo"; 
export class MovieService {

   private movieRepo: MovieRepo;

  constructor() {
    this.movieRepo = new MovieRepo();
  }
 async createMovie(movie: any): Promise<any>{
    return await this.movieRepo.createforMovie(movie)
   }
  // async getAllMovie(options: OptionsType): Promise<any> {
  //   return await this.movieRepo.getAllMovie(options);
  // }
  async getAllMovie(options: Options): Promise<any>{
    return await this.movieRepo.getAllMovie(options);
  }
  
    // GetMovieByID
   async getMovieID(movieId:string): Promise<any>{
    return await this.movieRepo.getMovieById(movieId);
   }

  //    updateMovie
   async updateMovie(movieId: string,data:object): Promise<any>{
    return await this.movieRepo.updateMovieID(movieId,data);
   }

  //   // DeletMovieByID
    async deleteMovieID(movieId: string): Promise<any>{
      return await this.movieRepo.deleteMovieByID(movieId);
    }

}