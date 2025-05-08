import { Request, Response, Router } from 'express'
import userRouter from './userRouter'
import reportRouter from './incidentReportRouter'
import authRouter from './authRouter'

const router = Router()

router.use('/user', userRouter)
router.use('/', authRouter)
router.use('/report', reportRouter)
router.use('/', (_req:Request, res: Response)=>{
    res.status(200).json('traf api running')
    return
})

export default router
