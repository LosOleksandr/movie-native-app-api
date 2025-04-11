import type ServerError from '@utils/server-error'
import type { NextFunction, Request, Response } from 'express'

const errorHandler = (err: ServerError, req: Request, res: Response, _next: NextFunction) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'

    res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        message,
        name: err.name,
        cause: err.cause,
    })
}

export default errorHandler
