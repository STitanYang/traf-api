import { Request, Response } from 'express'
import userService from '../service/userService'
import { InvalidAuthError, InvalidReqError, NotFoundError } from '../error/error'
import authService from '../service/authService'

export const getUserByUsername = async (req: Request, res: Response) => {
    const { username } = req.params
    const user = await userService.getById(username)
    if (user === null) {
        throw new NotFoundError(username)
    }
    res.status(200).json(user)
    return
}
export const getAllusers = async (_req: Request, res: Response) => {
    const users = await userService.getAllUsers()
    res.status(200).json(users)
    return
}
export const register = async (req: Request, res: Response) => {
    const { username, password } = req.body
    if (username == undefined || password == undefined) {
        throw new InvalidReqError()
    }
    let user = await authService.register(username, password)
    if (user === null) {
        throw new InvalidAuthError()
    }
    res.status(200).json(user)
    return
}
export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body
    if (username == undefined || password == undefined) {
        throw new InvalidReqError()
    }
    const token = await authService.login(username, password)
    if (token === null) {
        throw new InvalidAuthError()
    }
    res.status(200).json({
        token: token
    })
    return
}
