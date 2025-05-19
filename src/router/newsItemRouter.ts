import { Router } from 'express'
import { authenticateAdmin } from '../middleware/authMiddleWare'
import { createNews, deleteNews, getAllNews, getNewsItem, updateNews } from '../controller/newsItemController'
import { validateRequest } from '../middleware/validationMiddleware'
import { validateBody, validateTitle } from '../util/validator/newsItemValidator'
import { validateBase64Image } from '../util/validator/imageValidator'

const newsItemRouter = Router()

newsItemRouter.get('/', getAllNews)
newsItemRouter.get('/:uuid', getNewsItem)
newsItemRouter.use(authenticateAdmin)
newsItemRouter.post('/', [validateTitle, validateBody, validateBase64Image], validateRequest, createNews)
newsItemRouter.put('/:uuid', [validateTitle, validateBody, validateBase64Image], validateRequest, updateNews)
newsItemRouter.delete('/:uuid', deleteNews)

export = newsItemRouter
