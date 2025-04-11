import AuthService from '@/services/auth'
import type { Request, Response } from 'express'

class AuthController {
    private readonly authService: AuthService = new AuthService()

    public async register(req: Request, res: Response) {
        const result = await this.authService.register(req.body, res)

        res.status(201).json(result)
    }

    public async login(req: Request, res: Response) {
        const result = await this.authService.login(req.body, res)

        res.status(200).json(result)
    }

    public async logout(_req: Request, res: Response) {
        await this.authService.logout(res)

        res.status(200).json({ message: 'Logged out successfully' })
    }

    public async refresh(req: Request, res: Response) {
        const result = await this.authService.refresh(req.cookies.refreshToken, res)

        res.status(200).json(result)
    }
}

export default new AuthController()
