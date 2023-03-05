import { Post } from "../models/Post"
import { TPostInput } from "../types/TPost"
import postValidator from "./validators/postValidator"

export class PostService {

    constructor(private readonly postModel: Post = new Post()) {}
    async findAll() {
        return this.postModel.findAll()
    }
    async create(post: TPostInput) {
        const validPost = postValidator.validate(post)
        return this.postModel.create(validPost)
    }
}