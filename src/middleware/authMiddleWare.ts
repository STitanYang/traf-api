import {Request, Response, NextFunction} from 'express'
import authService from '../service/authService'
import {Role} from '../model/User'
import {UnauthError} from '../error/error'

export const authenticateAdmin = async (req: Request, res: Response, next: NextFunction) =>{
    let token = req.get('token') 
    if (typeof token === 'undefined'){
        const { tokenCookie } = req.cookies
        token = tokenCookie
    }
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
    let token = req.get('token') 
    if (typeof token === 'undefined'){
        const { tokenCookie } = req.cookies
        token = tokenCookie
    }
    if(typeof token === 'string'){
        const userdata = await authService.authenticate(token)
        res.locals.username = userdata?.username
        res.locals.role = userdata?.role
        next()
        return 
    }
    throw new UnauthError()
}
