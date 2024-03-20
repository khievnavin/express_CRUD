
import { movieModel } from "../models/movie";

export class MovieRepo {
  
    async getallMovie(): Promise<any>{
      return await movieModel.find();
    }
    async updateMovieID(movieId: string, name:object): Promise<any>{
        return await movieModel.findByIdAndUpdate(movieId , name);
    } 
    async getMovieById(movieId:string): Promise<any>{
      return await movieModel.findById(movieId);
    }
    async deleteMovieByID(movieId:string): Promise<any>{
      return await movieModel.findByIdAndDelete({_id:movieId});
    }
}