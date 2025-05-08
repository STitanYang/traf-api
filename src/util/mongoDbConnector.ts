import {Db, MongoClient } from 'mongodb'

const url = process.env.MONGO_URL
const dbName = process.env.MONGO_DB_NAME

export class MongoDbConnection{
    static #instance: MongoDbConnection
    db: Db
    private constructor(url: string|undefined, dbName: string|undefined){
        if (url === undefined || dbName === undefined){
           throw new Error('failed connecting to mongo, MONGO_URL or MONGO_DB_NAME env variable not set')
        }
        this.db = new MongoClient(url).db(dbName)
    }
    public static get instance(){
        if (!MongoDbConnection.#instance){
            console.log('connecting to mongo...')
            try{
                MongoDbConnection.#instance = new MongoDbConnection(url, dbName)
            }catch(err){
                throw Error(`failed connecting to mongo: ${err}`)
            }
            console.log('connected to mongo')
        }
        return MongoDbConnection.#instance
    }
}
