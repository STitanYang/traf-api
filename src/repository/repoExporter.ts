import {UserRepositoryMongoDB } from './user/UserRepositoryMongoDB'
import {TrafficLocationRepositoryMongoDB } from './trafficLocation/TrafficLocationRepositoryMongoDB'
import { IncidentReportRepositoryMongoDb } from './incidentReport/IncidentReportRepositoryMongoDB'

export const userRepository = new UserRepositoryMongoDB()
export const trafficLocationRepository = new TrafficLocationRepositoryMongoDB()
export const incidentReportRepository = new IncidentReportRepositoryMongoDb()
