import errorHandler from '@/middlewares/error-handler'
import router from '@/routes'
import env from '@utils/env'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(router)

app.use(
    cors({
        origin: true,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        exposedHeaders: ['Authorization'],
    })
)

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the API!',
        data: {
            version: '1.0.0',
            description: 'This is a basic API endpoint.',
        },
    })
})

app.use(errorHandler)

app.listen(env.PORT, () => {
    console.log(`Listening on port ${env.PORT}...`)
})
