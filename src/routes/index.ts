import { Router } from 'express'
import authRouter from './auth'
import tmdbRouter from './tmdb'
import userRouter from './user'

const router = Router()

router.use('/users', userRouter)
router.use('/auth', authRouter)
router.use('/tmdb', tmdbRouter)

export default router
