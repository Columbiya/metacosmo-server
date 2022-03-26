import { Router } from 'express'
import newController from '../news/newController.js'

const router = Router()

router.get('/', newController.getAll)
router.post('/', newController.create)
router.delete('/', newController.delete)

export default router