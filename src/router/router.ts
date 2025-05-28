import { Request, Response, Router } from 'express'
import userRouter from './userRouter'
import authRouter from './authRouter'
import newsItemRouter from './newsItemRouter'
import trafVolRouter from './volumeRouter'

const router = Router()


router.use('/', authRouter)
router.use('/user', userRouter)
router.use('/news', newsItemRouter)
router.use('/traffic', trafVolRouter)

router.use((_req: Request, res: Response) => {
    res.status(404).json('invalid url')
})

router.use('/', (_req: Request, res: Response) => {
    res.status(200).json('traf api running')
    return
})


export default router
