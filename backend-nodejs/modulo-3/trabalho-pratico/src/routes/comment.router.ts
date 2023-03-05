import { Router } from 'express'
import { CommentController } from '../controllers/comment.controller'

const router = Router()
const commentController = new CommentController()

router.post('/', async (req, res) => commentController.create(req, res))

export default router