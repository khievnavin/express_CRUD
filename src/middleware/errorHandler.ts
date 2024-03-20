import express , {Application , Request , Response , NextFunction} from 'express'


const errorhandler = ((err : Error, req: Request , res: Response , next: NextFunction) =>{
    res.status(404).json({
      message: err.message,
    });
})

export default errorhandler;