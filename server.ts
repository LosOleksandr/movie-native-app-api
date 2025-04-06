import db from '@/db'
import env from '@utils/env'
import 'dotenv/config'
import express from 'express'

const app = express()

app.get('/', (req, res) => {
    db.any('SELECT * FROM movies')
        .then((movies) => {
            return res.json(movies)
        })
        .catch((err) => {
            console.error('Error fetching movies:', err)
            res.status(500).send('Error fetching movies')
        })
})

app.listen(env.PORT, () => {
    console.log(`Listening on port ${env.PORT}...`)
})
