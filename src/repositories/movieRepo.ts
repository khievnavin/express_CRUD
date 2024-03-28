const movieModel = require('../models/movie')


export interface Options{
  page: number;
  limit: number
}
export class MovieRepo {

   ////GetAllMovie
    // async getAllMovie(page:number=1, limit:number=5): Promise<any>{  
    //    const skip = (page - 1) * limit;
    //   return await movieModel.find().skip(skip).limit(limit);
    // }
  

    async getAllMovie(options: Options): Promise<any>{
      const {page, limit} = options

      const skip: number = (page - 1) * limit;

      const moviesData = await movieModel.find().skip(skip).limit(limit).exec();

      const totalDocuments: number = await movieModel.countDocuments();
      const totalPages: number = Math.ceil(totalDocuments / limit);

      const paginateion ={
        page: page,
        totalPages: totalPages,
        totalDocuments: totalDocuments,
      }

      return { movies: moviesData, paginateion: paginateion}
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