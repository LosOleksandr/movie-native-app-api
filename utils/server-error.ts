export default class ServerError extends Error {
    public statusCode: number
    public name: string

    constructor(message: string, statusCode: number, cause?: Error, name: string = 'Error') {
        super(message, { cause })
        this.statusCode = statusCode
        this.name = name
    }

    static badRequest(message: string, cause?: Error, name?: string) {
        return new ServerError(message, 400, cause, name)
    }

    static unauthorized(message: string, cause?: Error, name?: string) {
        return new ServerError(message, 401, cause, name)
    }

    static forbidden(message: string, cause?: Error, name?: string) {
        return new ServerError(message, 403, cause, name)
    }

    static notFound(message: string, cause?: Error, name?: string) {
        return new ServerError(message, 404, cause, name)
    }

    static internal(message: string, cause?: Error, name?: string) {
        return new ServerError(message, 500, cause, name)
    }

    static conflict(message: string, cause?: Error, name?: string) {
        return new ServerError(message, 409, cause, name)
    }
}
