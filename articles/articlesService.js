import models from "../models/models.js"
import ApiError from './../error/ApiError.js';

class ArticlesService {
    
    async getAll(page, limit) {
        let offset = page * limit - limit
        const articles = await models.Article.findAndCountAll({limit: +limit, offset: +offset})
        return articles
    }

    async create({ title, author, quote, boldText, text, twoColumnContentFirst, twoColumnContentSecond, oneColumnContent, address, hider }) {
        if (!title || !author || !quote || !boldText || !text || !twoColumnContentFirst || !twoColumnContentSecond || !oneColumnContent || !address) {
            throw ApiError.badRequest('Не все required поля указаны в body запроса')
        }

        const candidate = await models.Article.findOne({where: {title}})

        if (candidate) {
            throw ApiError.badRequest('Такая статья уже существует')
        }
        
        const resultHider = hider ? hider: 'light'

        const newArticle = await models.Article.create({title, author, quote, boldText, twoColumnContentFirst, twoColumnContentSecond, text, oneColumnContent, address, hider: resultHider})
        return newArticle
    }

    async delete(id) {
        if (!id) {
            throw ApiError.badRequest('Не указан id')
        }

        const candidate = await models.Article.findByPk(id)
        if (!candidate) {
            throw ApiError.badRequest('статьи с указанным id не существует')
        }
        candidate.destroy()
        return candidate
    }

}

export default new ArticlesService()