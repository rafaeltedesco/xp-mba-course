import { Router } from 'express'
import { PostController } from '../controllers/post.controller'

const router = Router()

const postController = new PostController()

router.get('/', async (req, res) => postController.findAll(req, res))
router.post('/', async (req, res) => postController.create(req, res))

export default router