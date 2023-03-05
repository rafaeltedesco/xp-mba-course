import { mongoDBConnection } from "../database/connection";
import { TComment } from "../types/TComment";
import { Post } from "./Post";
import { ObjectId } from 'mongodb'


export class Comment {

    constructor(
        private readonly mongoDbConnection = mongoDBConnection,
        private readonly postModel = new Post()
        ) {}
    async create(comment: TComment) {
        const post = this.postModel.findById(comment.postId);
        if (!post) throw new Error('Invalid PostId')
        const connection = await this.mongoDbConnection.connect()
        const { nome, conteudo } = comment
        await connection.db('igti').collection('posts').updateOne({_id: new ObjectId(comment.postId)}, {$push: {comentarios: {
            nome, conteudo
        }}})
        connection.close()
    }
}