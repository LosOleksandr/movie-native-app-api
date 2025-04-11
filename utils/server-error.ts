export default class ServerError extends Error {
    public statusCode: number

    constructor(message: string, statusCode: number, cause?: Error) {
        super(message, { cause })
        this.statusCode = statusCode
    }

    static badRequest(message: string, cause?: Error) {
        return new ServerError(message, 400, cause)
    }

    static unauthorized(message: string, cause?: Error) {
        return new ServerError(message, 401, cause)
    }

    static forbidden(message: string, cause?: Error) {
        return new ServerError(message, 403, cause)
    }

    static notFound(message: string, cause?: Error) {
        return new ServerError(message, 404, cause)
    }

    static internal(message: string, cause?: Error) {
        return new ServerError(message, 500, cause)
    }

    static conflict(message: string, cause?: Error) {
        return new ServerError(message, 409, cause)
    }
}
