import { Request, Response } from "express";
import { CommentService } from "../services/comment.service";
import { HttpResponseBadRequest, HttpResponseOK } from "../utils/http/httpResponses";


export class CommentController {
    constructor(private readonly commentService: CommentService = new CommentService()) {}
    async create(req: Request, res: Response) {
        try {
            await this.commentService.create(req.body)
            return new HttpResponseOK(res).sendResponse({
                message: 'created!'
            })
        }
        catch(err) {
            const error = err as Error
            return new HttpResponseBadRequest(res).sendResponse({
                message: error.message
            })
        }
    }   
}