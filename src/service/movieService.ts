import { MovieRepo } from "../repositories/movieRepo";

export class MovieService {

   private movieRepo: MovieRepo;

  constructor() {
    this.movieRepo = new MovieRepo();
  }
 async createMovie(movie: any): Promise<any>{
    return await this.movieRepo.createforMovie(movie)
   }
  async getAllMovie(): Promise<any> {
    return await this.movieRepo.getAllMovie();
  }
  // async getAllMovie(): Promise<any>{
  //   return await this.repo.getallMovie();
  // }
  
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

  //   // CreateMovie
  //   async createMovie(data:object): Promise<any>{
  //     return await this.repo.createforMovie(data);
  //   }

}