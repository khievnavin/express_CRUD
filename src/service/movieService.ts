import { MovieRepo } from "../repositories/movieRepo"

export class MovieService{
  repo: MovieRepo;
  constructor(){
    this.repo = new MovieRepo();
  }

  //    GetAllMovie
  async getMovies(): Promise<any>{
    return await this.repo.getallMovie();
  }
   //   GetMovieByID
   async getMovieID(movieId:string): Promise<any>{
    return await this.repo.getMovieById(movieId);
   }

  //    updateMovie
   async updateMovie(movieId: string,data:object): Promise<any>{
    return await this.repo.updateMovieID(movieId,data);
   }

  
    // DeletMovieByID
    async deleteMovieID(movieId: string): Promise<any>{
      return await this.repo.deleteMovieByID(movieId);
    }
    async createMovie(data:object): Promise<any>{
      return await this.repo.createforMovie(data);
    }

}