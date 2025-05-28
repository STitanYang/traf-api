import {Request, Response, NextFunction} from 'express'
import authService from '../service/authService'
import {Role} from '../model/User'
import {UnauthError} from '../error/error'

export const authenticateAdmin = async (req: Request, res: Response, next: NextFunction) =>{
    let temp_token = req.get('token') 
    if (typeof temp_token === 'undefined'){
        const { token } = req.cookies
        temp_token = token
    }
    const token = temp_token
    if(typeof token === 'string'){
        const userdata = await authService.authenticate(token)
        if (userdata?.role === Role.Administrator){
            res.locals.username = userdata?.username
            res.locals.role = userdata?.role
            next()
            return
        }
    }
    throw new UnauthError()
}
export const authenticateUser = async (req: Request, res: Response, next: NextFunction) =>{
    let temp_token = req.get('token') 
    if (typeof temp_token === 'undefined'){
        const { token } = req.cookies
        temp_token = token
    }
    const token = temp_token
    if(typeof token === 'string'){
        const userdata = await authService.authenticate(token)
        if (userdata === null){
            throw new UnauthError()
        }
        res.locals.username = userdata.username
        res.locals.role = userdata.role
        next()
        return 
    }
    throw new UnauthError()
}
