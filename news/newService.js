import models from '../models/models.js'
import ApiError from './../error/ApiError.js';
import { v4 as uuidv4 } from 'uuid'
import * as path from 'path'

class NewService {

    async getAll(page, limit) {
        let offset = page * limit - limit
        const news = await models.New.findAndCountAll({limit: +limit, offset: +offset})
        return news
    }

    async create({ subtitle, title, author, boldText, text, img, twoColumnContentFirst, twoColumnContentSecond, oneColumnContent, hider }) {
        if (!title || !subtitle || !author || !img || !boldText || !text || !twoColumnContentFirst || !twoColumnContentSecond || !oneColumnContent) {
            throw ApiError.badRequest('Все required поля не были переданы в body')
        }
        if (Array.isArray(subtitle)) {
            throw ApiError.badRequest('subtitle должен быть строкой с двумя частями, разбитыми символом |||')
        }

        const subtitles = subtitle.split('|||')
        if (subtitles.length !== 2) {
            throw ApiError.badRequest('subtitle должен быть строкой с двумя частями, разбитыми символом |||')
        }

        const candidate = await models.New.findOne({where: {title}})

        if (candidate) {
            throw ApiError.badRequest('Такая новость уже существует')
        }

        const resultHider = hider ? hider: 'light'

        const __dirname = path.resolve()
        let fileName = uuidv4() + '.jpg'
        img.mv(path.resolve(__dirname, 'static', fileName))

        const CreatedNew = await models.New.create({subtitle, title, author, boldText, text, twoColumnContentFirst, twoColumnContentSecond, oneColumnContent, hider: resultHider, img: fileName})
        return CreatedNew
    }

    async delete(id) {
        if (!id) {
            throw ApiError.badRequest('Не указан id')
        }

        const candidate = await models.New.findByPk(id)
        if (!candidate) {
            throw ApiError.badRequest('статьи с указанным id не существует')
        }
        candidate.destroy()
        return candidate
    }

}

export default new NewService()