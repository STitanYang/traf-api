import { Collection, Db } from "mongodb";
import { INewsRepository } from "../interface/INewsRepository";
import { MongoDbConnection } from "../../util/mongoDbConnector";
import { NewsItem } from "../../model/NewsItem";

const newsItemSchema = {
    $jsonSchema: {
        bsonType: 'object',
        required: ['uuid', 'title', 'body','imageBase64','dateCreated' ],
        properties: {
            uuid: {
                bsonType: 'string',
                description: 'string, required, unique'
            },
            title: {
                bsonType: 'string',
                description: 'string, required'
            },
            body:{
                bsonType: 'string',
                description: 'string, required'
            },
            imageBase64: {
                bsonType: 'string',
                description: 'string, required'
            },
            dateCreated:{
                bsonType: 'string',
                description: 'string, required'
            },
        }
    }
};

export class NewsRepositoryMongoDb implements INewsRepository{
    private db: Db 
    private newsItems!: Collection<NewsItem>

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
            coll.name === 'newsItems'
        })
        if (!usersCollectionExist){
            this.db.createCollection('newsItems', {
                validator: newsItemSchema,
                validationLevel: 'strict'
            })
        }
        this.newsItems = this.db.collection<NewsItem>('newsItems')
    }
    async getAll(): Promise<NewsItem[]> {
        try{
            return await this.newsItems.find().toArray()
        }catch(err){
            throw err 
        }
    }
    async getById(uuid: string): Promise<NewsItem | null> {
        try{
            return await this.newsItems.findOne({uuid: uuid})
        }
        catch(err){
            throw err
        }
    }
    async create(news: NewsItem): Promise<NewsItem> {
        try{
            await this.newsItems.insertOne(news)
            return news
        }catch(err){
            throw err
        }
    }
    async update(uuid: string, newNews: NewsItem): Promise<NewsItem | null> {
        try{
            const result = await this.newsItems.updateOne({uuid: uuid}, newNews)
            if (result.matchedCount === 0){
                return null
            }
            return newNews
        }catch(err){
            throw err
        }
    }
    async delete(uuid: string): Promise<void> {
        try{
            await this.newsItems.deleteOne({uuid: uuid})
        }
        catch(err){
            throw err
        }
    }
}
