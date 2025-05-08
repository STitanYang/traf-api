import { Collection, Db } from "mongodb";
import { IncidentReport } from "../../model/IncidentReport";
import { IIncidentReportRepository } from "../interface/IIncidentReportRepository";
import { MongoDbConnection } from "../../util/mongoDbConnector";

const incidentReportSchema = {
    $jsonSchema: {
        bsonType: 'object',
        required: ['uuid', 'username', 'locationId', 'time', 'type', 'desc', 'isApproved', '_voters'],
        properties: {
            uuid: {
                bsonType: 'string',
                description: 'string, required, unique'
            },
            username: {
                bsonType: 'string',
                description: 'string, required'
            },
            locationId:{
                bsonType: 'string',
                description: 'string, required'
            },
            type: {
                enum: ['kecelakaan', 'macet', 'perbaikan', 'lain'],
                description: 'enum, required'
            },
            time:{
                bsonType: 'string',
                description: 'string, required'
            },
            desc:{
                bsonType: 'string',
                description: 'string, required'
            },
            isApproved:{
                bsonType: 'bool',
                description: 'boolean, required'
            },
            _voters: {
                bsonType: 'array',
                items: {
                    bsonType: 'string'
                },
                description: 'array of strings'
            }
        }
    }
};

export class IncidentReportRepositoryMongoDb implements IIncidentReportRepository{
    private db: Db 
    private incidentReports!: Collection<IncidentReport>

    constructor(){
        const mongoDbConn = MongoDbConnection.instance
        this.db = mongoDbConn.db
        try{
            this.ensureCollection()
        }
        catch(err){
            throw(err)
        }
    }
    private async ensureCollection():Promise<void>{
        const collection = await this.db.listCollections().toArray()
        const usersCollectionExist = collection.some(coll =>{
            coll.name === 'incidentReports'
        })
        if (!usersCollectionExist){
            this.db.createCollection('incidentReports', {
                validator: incidentReportSchema,
                validationLevel: 'strict'
            })
        }
        this.incidentReports = this.db.collection<IncidentReport>('incidentReports')
    }
    async getByUsername(username: string): Promise<IncidentReport[]> {
        try{
            return await this.incidentReports.find({username: username}).toArray()
        }catch(err){
            throw err 
        }
    }
    async getByLocation(locationId: string): Promise<IncidentReport[]> {
        try{
            return await this.incidentReports.find({username: locationId}).toArray()
        }catch(err){
            throw err 
        }
    }

    async getById(uuid: string): Promise<IncidentReport | null> {
        try{
            return await this.incidentReports.findOne({uuid: uuid})
        }
        catch(err){
            throw err
        }
    }
    async create(report: IncidentReport): Promise<IncidentReport | null> {
        try{
            await this.incidentReports.insertOne(report)
            return report
        }catch(err){
            throw err
        }
    }
    async update(uuid: string, newReport: IncidentReport): Promise<IncidentReport | null> {
        try{
            const result = await this.incidentReports.updateOne({uuid: uuid}, newReport)
            if (result.matchedCount === 0){
                return null
            }
            return newReport
        }catch(err){
            throw err
        }
    }
    async delete(uuid: string): Promise<void> {
        try{
            await this.incidentReports.deleteOne({uuid: uuid})
        }
        catch(err){
            throw err
        }
    }
}
