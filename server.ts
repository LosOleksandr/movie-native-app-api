import env from '@utils/env'
import { sql } from 'bun'
import express from 'express'

const app = express()

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/users', async (req, res) => {
    const users = await sql`SELECT * FROM sessions`
    res.json(users)
})

app.post('/users', async (req, res) => {
    const userData = {
        username: 'Alice2',
        email: 'alic1e@example.com',
        password: 'password',
    }

    const [newUser] = await sql`
        INSERT INTO users ${sql(userData)}
        RETURNING *
        `

    res.json(newUser)
})

app.listen(env.PORT, () => {
    console.log(`Listening on port ${env.PORT}...`)
})
