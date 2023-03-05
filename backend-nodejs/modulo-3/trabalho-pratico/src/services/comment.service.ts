import { Comment } from '../models/Comment';
import { Post } from '../models/Post';
import { TComment } from '../types/TComment';
import commentValidator from './validators/commentValidator';

export class CommentService {

    constructor(
        private readonly commentModel: Comment = new Comment(),
        private readonly postModel: Post = new Post()
        ) {}
    async create(comment: TComment) {
        const validComment = commentValidator.validate(comment)
        const post = await this.postModel.findById(validComment.postId)
        if (!post) throw new Error('Post Not Found')
        return this.commentModel.create(validComment)
    }
}