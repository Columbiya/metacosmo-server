import { Router } from 'express'
import articlesController from '../articles/articlesController.js'

const router = Router()

router.get('/', articlesController.getAll)
router.post('/', articlesController.create)
router.delete('/', articlesController.delete)

export default router