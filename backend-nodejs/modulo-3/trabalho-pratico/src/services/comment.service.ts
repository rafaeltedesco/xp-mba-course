import { Comment } from '../models/Comment';
import { Post } from '../models/Post';
import { TComment } from '../types/TComment';

export class CommentService {

    constructor(
        private readonly commentModel: Comment = new Comment(),
        private readonly postModel: Post = new Post()
        ) {}
    async create(comment: TComment) {
        const post = await this.postModel.findById(comment.postId)
        return this.commentModel.create(comment)
    }
}