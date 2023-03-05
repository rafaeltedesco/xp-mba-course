import { Post } from "../models/Post"
import { TPostInput } from "../types/TPost"

export class PostService {

    constructor(private readonly postModel: Post = new Post()) {}
    async findAll() {
        return this.postModel.findAll()
    }
    async create(post: TPostInput) {
        return this.postModel.create(post)
    }
}