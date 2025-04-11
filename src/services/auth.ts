import type { AuthCredentials } from '@/types/auth'
import type { User } from '@/types/user'
import setCookies, { resetCookies } from '@utils/cookies'
import ServerError from '@utils/server-error'
import type { Response } from 'express'
import JWTService from './jwt'
import UserService from './user'

export default class AuthService {
    private readonly userService: UserService
    private readonly jwtService: JWTService

    constructor() {
        this.jwtService = new JWTService()
        this.userService = new UserService()
    }

    private async setAuthCookies(res: Response, refreshToken: string) {
        setCookies(res, {
            name: 'refreshToken',
            value: refreshToken,
            options: {
                maxAge: 7 * 24 * 60 * 60 * 1000,
            },
        })
    }

    public async register(
        body: AuthCredentials,
        res: Response
    ): Promise<{ user: Omit<User, 'password'>; accessToken: string }> {
        const { email, password } = body

        const user = await this.userService.createUser({ email, password })

        const { accessToken, refreshToken } = this.jwtService.generateTokens(user)

        this.setAuthCookies(res, refreshToken)

        return { user, accessToken }
    }

    public async login(body: AuthCredentials, res: Response): Promise<{ accessToken: string }> {
        const { email, password } = body

        const user = await this.userService.getUserByEmail(email)

        if (!user) {
            throw ServerError.badRequest('Invalid credentials')
        }

        const isPasswordValid = await this.userService.comparePassword(password, user.password)

        if (!isPasswordValid) {
            throw ServerError.badRequest('Invalid credentials')
        }

        const { accessToken, refreshToken } = this.jwtService.generateTokens(user)

        this.setAuthCookies(res, refreshToken)

        return { accessToken }
    }

    public async logout(res: Response): Promise<void> {
        resetCookies(res, 'refreshToken', {
            maxAge: 0,
        })
    }

    public async refresh(refreshToken: string, res: Response): Promise<{ accessToken: string }> {
        if (!refreshToken) {
            throw ServerError.unauthorized('Refresh token is invalid or expired')
        }

        let token = ''

        this.jwtService.verifyRefreshToken(refreshToken, async (decoded) => {
            const { accessToken, refreshToken } = this.jwtService.generateTokens({
                id: decoded.id,
                email: decoded.email,
            })

            this.setAuthCookies(res, refreshToken)

            token = accessToken
        })

        return { accessToken: token }
    }
}
