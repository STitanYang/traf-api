import { Router } from 'express'
import { login, register } from '../controller/userController'
import { validateEmail, validatePassword, validateUsername } from '../util/validator/userValidator'
import { validateRequest } from '../middleware/validationMiddleware'

const authRouter = Router()

authRouter.post('/register', [validateUsername, validateEmail, validatePassword], validateRequest, register)
authRouter.post('/login', [validateUsername, validatePassword], validateRequest, login)

export default authRouter
