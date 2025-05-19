import { Request, Response, Router } from 'express'
import userRouter from './userRouter'
import reportRouter from './incidentReportRouter'
import authRouter from './authRouter'
import newsItemRouter from './newsItemRouter'

const router = Router()


router.use('/', authRouter)
router.use('/user', userRouter)
// router.use('/report', reportRouter)
router.use('/news', newsItemRouter)

router.use((_req: Request, res: Response) => {
    res.status(404).json('invalid url')
})

router.use('/', (_req: Request, res: Response) => {
    res.status(200).json('traf api running')
    return
})


export default router
