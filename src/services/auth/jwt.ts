import type { DecodedUser, User } from '@/types/user'
import env from '@utils/env'
import ServerError from '@utils/server-error'
import jwt from 'jsonwebtoken'

export default class JWTService {
    private readonly ACCESS_TOKEN_SECRET: string
    private readonly REFRESH_TOKEN_SECRET: string
    private readonly ACCESS_TOKEN_EXPIRES_IN: string
    private readonly REFRESH_TOKEN_EXPIRES_IN: string

    constructor() {
        this.ACCESS_TOKEN_SECRET = env.ACCESS_TOKEN_SECRET
        this.REFRESH_TOKEN_SECRET = env.REFRESH_TOKEN_SECRET
        this.ACCESS_TOKEN_EXPIRES_IN = env.ACCESS_TOKEN_EXPIRES_IN
        this.REFRESH_TOKEN_EXPIRES_IN = env.REFRESH_TOKEN_EXPIRES_IN
    }

    private generateAccessToken(user: Pick<User, 'id' | 'email'>): string {
        const payload = {
            id: user.id,
            email: user.email,
        }

        const expiresIn = parseInt(this.ACCESS_TOKEN_EXPIRES_IN)

        const accessToken = jwt.sign(payload, this.ACCESS_TOKEN_SECRET, {
            expiresIn,
        })

        return accessToken
    }

    private generateRefreshToken(user: Pick<User, 'id' | 'email'>): string {
        const payload = {
            id: user.id,
            email: user.email,
        }

        const expiresIn = parseInt(this.REFRESH_TOKEN_EXPIRES_IN)

        const refreshToken = jwt.sign(payload, this.REFRESH_TOKEN_SECRET, {
            expiresIn,
        })

        return refreshToken
    }

    public generateTokens(user: Pick<User, 'id' | 'email'>): { accessToken: string; refreshToken: string } {
        return {
            accessToken: this.generateAccessToken(user),
            refreshToken: this.generateRefreshToken(user),
        }
    }

    public verifyAccessToken(token: string, func: (decoded: DecodedUser) => void): void {
        jwt.verify(token, this.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                throw ServerError.unauthorized('Access token is invalid or expired')
            } else {
                func(decoded as DecodedUser)
            }
        })
    }

    public verifyRefreshToken(token: string, func: (decoded: DecodedUser) => void): void {
        jwt.verify(token, this.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                throw ServerError.unauthorized('Refresh token is invalid or expired')
            } else {
                func(decoded as DecodedUser)
            }
        })
    }
}
