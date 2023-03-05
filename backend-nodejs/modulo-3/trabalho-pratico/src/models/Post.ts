import { mongoDBConnection } from "../database/connection";
import { TPostInput, TPostOutput } from "../types/TPost";
import { ObjectId } from 'mongodb'

export class Post {

    db = 'igti'

    constructor(private readonly mongoDbConnection = mongoDBConnection) { }
    async findAll() {
        const connection = await this.mongoDbConnection.connect()
        const documents = await connection.db(this.db).collection('posts').find({}).toArray()
        connection.close()
        return documents
    }
    async create(post: TPostInput) {
        const connection = await this.mongoDbConnection.connect()
        await connection.db(this.db).collection('posts').insertOne(post)
        connection.close()
    }
    async findById(postId: string) {
        const connection = await this.mongoDbConnection.connect()
        return connection.db(this.db).collection('posts').findOne({_id: new ObjectId(postId)})
    }
}