import articlesService from "./articlesService.js"

class ArticlesController {

    async getAll(req, res, next) {
        const { page = 1, limit = 16 } = req.query
        const articles = await articlesService.getAll(page, limit)
        return res.json(articles)
    }

    async create(req, res, next) {
        try {
            const { title, author, quote, boldText, text, twoColumnContentFirst, twoColumnContentSecond, oneColumnContent, address, hider } = req.body
            const article = await articlesService.create({title, author, quote, boldText, text, twoColumnContentFirst, twoColumnContentSecond, oneColumnContent, address, hider})
            return res.json(article)
        } catch(e) {
            next(e)
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.body
            const deleted = await articlesService.delete(id)
            res.json(deleted)
        } catch(e) {
            next(e)
        }
    }

}

export default new ArticlesController()