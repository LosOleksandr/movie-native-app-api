import UserController from '@/controllers/user'
import authGuard from '@/middlewares/auth-guard'
import wrapper from '@/middlewares/wrapper'
import { Router } from 'express'

const userRouter = Router()

userRouter.get('/current', authGuard, wrapper(UserController.getCurrentUser.bind(UserController)))

export default userRouter
