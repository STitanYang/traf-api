import { Router } from 'express'
import {getAllusers, getUserByUsername} from '../controller/userController'
import { authenticateUser } from '../middleware/authMiddleWare'

const userRouter = Router()

userRouter.use(authenticateUser)
userRouter.get('/:username', getUserByUsername)
userRouter.get('/users',getAllusers)

export default userRouter
