import {UserRepositoryMongoDB } from './user/UserRepositoryMongoDB'
import {TrafficLocationRepositoryMongoDB } from './trafficLocation/TrafficLocationRepositoryMongoDB'
import { IncidentReportRepositoryMongoDb } from './incidentReport/IncidentReportRepositoryMongoDB'
import { NewsRepositoryMongoDb } from './newsItem/newsRepositoryMongoDB'

export const userRepository = new UserRepositoryMongoDB()
export const trafficLocationRepository = new TrafficLocationRepositoryMongoDB()
export const incidentReportRepository = new IncidentReportRepositoryMongoDb()
export const newsItemRepository = new NewsRepositoryMongoDb()
