import { movieModel } from "../models/movie";

export class MovieRepo {
  ///GetAllMovie
    async getallMovie(): Promise<any>{
      return await movieModel.find();
    }

    ////UpdateMovie
    async updateMovieID(movieId: string, name:object): Promise<any>{
        return await movieModel.findByIdAndUpdate(movieId , name);
    } 

    ////GetMovieByID
    async getMovieById(movieId:string): Promise<any>{
      return await movieModel.findById(movieId);
    }

    //DeleteMovieByID
    async deleteMovieByID(movieId:string): Promise<any>{
      return await movieModel.findByIdAndDelete({_id:movieId});
    }

    //CreateForMovie
    async createforMovie(data:object): Promise<any>{
      const newData = new movieModel(data)
      return await newData.save();
    }
}