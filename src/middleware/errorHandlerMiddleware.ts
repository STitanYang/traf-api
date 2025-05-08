import {Request, Response, NextFunction,} from 'express'
import {BaseError} from '../error/error'

export const handleError = async (err: Error, req: Request , res: Response, _next: NextFunction) => {
    console.error(err)
    console.log(req.params)
    if (err instanceof BaseError){
        res.status(err.statusCode).json(err.responseMessage)
        return 
    }else{
        res.status(500).json('something went wrong')
        return 
    }
}
