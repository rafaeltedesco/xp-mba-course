import { TPostInput, TPostOutput } from "../types/TPost";


export class Post {
    async findAll(): Promise<TPostOutput[]> {
        return []
    }
    async create(post: TPostInput) {
        return []
    }
    async findById(postId: string): Promise<TPostOutput | undefined> {
        return
    }
}