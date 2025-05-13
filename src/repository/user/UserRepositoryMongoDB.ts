import {Db, Collection, BSONType} from 'mongodb'
import {User} from '../../model/User'
import {IUserRepository} from '../interface/IUserRepository'
import { MongoDbConnection } from '../../util/mongoDbConnector';

const userSchema = {
    $jsonSchema: {
        bsonType: 'object',
        required: ['username','email','profileImageBase64','passwordHash', 'role'],
        properties: {
            username: {
                bsonType: 'string',
                description: 'string, required, unique'
            },
            email:{
                BSONType: 'string',
                description: 'string, required'
            },
            profileImageBase64:{
                BSONType: 'string',
                description: 'string, required'
            },
            passwordHash:{
                bsonType: 'string',
                description: 'string, required'
            },
            role: {
                enum: ['admininstrator', 'user'],
                description: 'enum, required'
            }
        }
    }
};

export class UserRepositoryMongoDB implements IUserRepository{
    private db: Db
    private users!: Collection<User>

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
            coll.name === 'users'
        })
        if (!usersCollectionExist){
            this.db.createCollection('users', {
                validator: userSchema,
                validationLevel: 'strict'
            })
        }
        this.users = this.db.collection<User>('users')
    }
    async getById(username: string): Promise<User|null>{
        try{
            const foundUser = await this.users.findOne({username: username})
            return foundUser
        }catch(err){
            throw err 
        }
    }
    async getAll(): Promise<User[]>{
        try{
            return await this.users.find().toArray()
        }catch(err){
            throw err 
        }
    }
    async create(newUser: User): Promise<User|null>{
        try{
            await this.users.insertOne(newUser)
            return newUser
        }catch(err){
            throw err
        }
    }
    async update(username: string, newUserData: User): Promise<User|null>{
        try{
            const result = await this.users.updateOne({username: username}, User)
            if (result.matchedCount === 0){
                return null
            }
            return newUserData
        }catch(err){
            throw err
        }
    }
}
