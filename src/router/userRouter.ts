import { Router } from 'express'
import { editUser, getAllusers, getUserByUsername} from '../controller/userController'
import { authenticateUser } from '../middleware/authMiddleWare'

const userRouter = Router()
userRouter.put('/:username', editUser)
userRouter.use(authenticateUser)
userRouter.get('/:username', getUserByUsername)
userRouter.get('/users',getAllusers)

export default userRouter
