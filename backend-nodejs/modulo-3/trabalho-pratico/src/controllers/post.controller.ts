import { Request, Response } from "express";
import { PostService } from "../services/post.service";
import { HttpResponseBadRequest, HttpResponseOK } from "../utils/http/httpResponses";


export class PostController {
    constructor(private readonly postService: PostService = new PostService()) {}
    async findAll(req: Request, res: Response) {
        const posts = await this.postService.findAll();
        return new HttpResponseOK(res).sendResponse(posts);
    }
    async create(req: Request, res: Response) {
        try {
            await this.postService.create(req.body)
            return new HttpResponseOK(res).sendResponse({
                message: 'created!'
            })
        }
        catch(err) {
            const error = err as Error
            return new HttpResponseBadRequest(res).sendResponse({message: error.message})
        }
    }
}