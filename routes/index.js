import { Router } from 'express'
import newsRouter from './news-router.js';
import articlesRouter from './articles-router.js';

const router = Router()

router.use('/news', newsRouter)
router.use('/articles', articlesRouter)

export default router