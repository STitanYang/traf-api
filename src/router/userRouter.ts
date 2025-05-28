import { Router } from 'express'
import { editUser, getAllusers, getUserByUsername } from '../controller/userController'
import { authenticateUser } from '../middleware/authMiddleWare'
import { validateRequest } from '../middleware/validationMiddleware'
import { validateEmail, validateNewPassword, validateUsername } from '../util/validator/userValidator'
import { validateBase64Image } from '../util/validator/imageValidator'

const userRouter = Router()
userRouter.use(authenticateUser)
userRouter.put('/:existingUsername', [validateUsername, validateEmail], validateRequest, editUser)
userRouter.get('/:username', getUserByUsername)
userRouter.get('/users', getAllusers)

export default userRouter
