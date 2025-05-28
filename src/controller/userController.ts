import { Request, Response } from 'express'
import userService from '../service/userService'
import { InvalidAuthError, NotFoundError, ResourceConflictError, UnauthError } from '../error/error'
import authService from '../service/authService'
import { use } from '../router/newsItemRouter'

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
    const { username, email, password } = req.body
    const isUserExists = await userService.getById(username) !== null
    if (isUserExists) {
        throw new ResourceConflictError(`username: ${username}`)
    }
    let user = await authService.register(username, email, password)
    if (user === null) {
        throw new InvalidAuthError()
    }
    res.status(200).json(user)
    return
}
export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body
    const token = await authService.login(username, password)
    if (token === null) {
        throw new InvalidAuthError()
    }
    res.status(200).json({
        token: token
    })
    return
}
export const editUser = async (req: Request, res: Response) => {
    const {existingUsername} = req.params
    const { username, email, image} = req.body
    let user = await userService.updateUser(existingUsername, username, email, image)
    if (user === null) {
        throw new NotFoundError(`user: ${username}`)
    }
    res.status(200).json(user)
    return
}
