import { Router } from 'express'
import { approve, createReport, getReportByLocation, getReportByUsername, vote } from '../controller/incidentReportController'
import { authenticateAdmin, authenticateUser } from '../middleware/authMiddleWare'

const reportRouter = Router()

reportRouter.get('/user/:username', getReportByUsername)
reportRouter.get('/location/:locationId', getReportByLocation)
reportRouter.post('/vote/:uuid', authenticateUser, vote)
reportRouter.post('/approve/:uuid', authenticateAdmin, approve)
reportRouter.post('/', authenticateUser, createReport)

export default reportRouter
