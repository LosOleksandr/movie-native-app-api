import AuthController from '@/controllers/auth'
import authGuard from '@/middlewares/auth-guard'
import wrapper from '@/middlewares/wrapper'
import { Router } from 'express'

const authRouter = Router()

authRouter.post('/login', wrapper(AuthController.login.bind(AuthController)))

authRouter.post('/register', wrapper(AuthController.register.bind(AuthController)))

authRouter.post('/logout', authGuard, wrapper(AuthController.logout.bind(AuthController)))

authRouter.post('/refresh', wrapper(AuthController.refresh.bind(AuthController)))

export default authRouter
