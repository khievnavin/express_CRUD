import { Request , Response , NextFunction } from "express";
const movieModel = require('../models/movie')


const getIdMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    try {
      const m = await movieModel.findById(req.params.movieId);
      if (m) {
      res.json({ status: "success", message: "Movie found!!!", data: m });}
      else {
        next(Error('Movie not found'));
      }
    } catch (err) {
      // return res.status(404).json({ message: "Movie not found" });
      next(new Error('Movie not found!!'));
    }
};
export default getIdMiddleware;