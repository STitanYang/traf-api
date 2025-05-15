import {Request, Response, NextFunction,} from 'express'
import {BaseError} from '../error/error'

export const handleError = async (err: Error, _req: Request , res: Response, _next: NextFunction) => {
    console.dir(err,{depth: null})
    if (err instanceof BaseError){
        res.status(err.statusCode).json(err.responseMessage)
        return 
    }else{
        res.status(500).json('something went wrong')
        return 
    }
}
