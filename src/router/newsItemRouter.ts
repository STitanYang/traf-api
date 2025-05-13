import { Router } from 'express'
import { authenticateAdmin } from '../middleware/authMiddleWare'
import { createNews, deleteNews, getAllNews, getNewsItem, updateNews } from '../controller/newsItemController'

const newsItemRouter = Router()  

newsItemRouter.get('/', getAllNews)
newsItemRouter.get('/:uuid', getNewsItem)
newsItemRouter.use(authenticateAdmin)
newsItemRouter.post('/', createNews)
newsItemRouter.put('/:uuid',updateNews)
newsItemRouter.delete('/:uuid',deleteNews)

export = newsItemRouter
