import newService from "./newService.js";

class NewController {

    async getAll(req, res, next) {
        const { page = 1, limit = 8 } = req.query
        const news = await newService.getAll(page, limit)
        return res.json(news)
    }

    async create(req, res, next) {
        try {
            const { subtitle, title, author, boldText, text, twoColumnContentFirst, twoColumnContentSecond, oneColumnContent, hider } = req.body
            const { img } = req.files
            const createdNew = await newService.create({title, subtitle, author, img, boldText, text, twoColumnContentFirst, twoColumnContentSecond, oneColumnContent, hider})
            return res.json(createdNew)
        } catch(e) {
            next(e)
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.body
            const deleted = await newService.delete(id)
            res.json(deleted)
        } catch(e) {
            next(e)
        }
    }
}

export default new NewController()