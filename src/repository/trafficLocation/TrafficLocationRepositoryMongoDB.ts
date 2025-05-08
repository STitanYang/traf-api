import { Collection, Db } from "mongodb";
import { MongoDbConnection } from "../../util/mongoDbConnector";
import { ITrafficLocationRepository } from '../interface/ITrafficLocationRepository'

export class TrafficLocationRepositoryMongoDB implements ITrafficLocationRepository{
    private db: Db
    private tls!: Collection<TrafficLocation>
    constructor(){
        const mongoDbConn = MongoDbConnection.instance
        this.db = mongoDbConn.db
        try{
            this.ensureCollection
        }catch(err){
            console.error(err)
            throw err
        }
    }
    private async ensureCollection(): Promise<void>{
        const collection = await this.db.listCollections().toArray()
        const tlsCollectionExist = collection.some(coll =>{
            coll.name === 'trafficLocations'
        })
        if (!tlsCollectionExist){
            this.db.createCollection('trafficLocations', {
                //validator: trafficLocationschema,
                //validationLevel: 'strict'
            })
        }
        this.tls = this.db.collection<TrafficLocation>('trafficLocations')
    }
    async getAll(): Promise<TrafficLocation[]>{
        try{
            return await this.tls.find().toArray()
        }catch(err){
            throw err
        }
    }
    async getById(id: string): Promise<TrafficLocation|null>{
        try{
            const foundLocation = await this.tls.findOne({id : id}) 
            return foundLocation
        }catch(err){
           throw err 
        }
    }
}
