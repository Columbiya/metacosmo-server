import ApiError from "../error/ApiError.js";

export default function errorHandlingMiddleware(err, req, res, next) {
    if (err instanceof ApiError) {
        return res.status(err.status).json(err.message)
    }
    console.log(err)
}