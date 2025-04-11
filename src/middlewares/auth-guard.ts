import JWTService from '@/services/jwt'
import type { AuthRequest } from '@/types/auth'
import ServerError from '@utils/server-error'
import type { NextFunction, Response } from 'express'

const jwtService = new JWTService()

const authGuard = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]

        if (!token) {
            throw new ServerError('Unauthorized', 401)
        }

        jwtService.verifyAccessToken(token, (decoded) => {
            req.user = decoded
        })

        next()
    } catch (error) {
        next(error)
    }
}

export default authGuard
