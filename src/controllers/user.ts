import UserService from '@/services/user'
import type { AuthRequest } from '@/types/auth'
import checkRequestUser from '@utils/check-request-user'
import type { Response } from 'express'

class UserController {
    private readonly userService: UserService = new UserService()

    public async getCurrentUser(req: AuthRequest, res: Response) {
        const { id } = checkRequestUser(req.user)

        const result = await this.userService.getUserById(id as string)

        res.status(200).json(result)
    }
}

export default new UserController()
