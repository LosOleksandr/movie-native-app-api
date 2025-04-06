import pgPromise from 'pg-promise'
import env from '../utils/env'

const pgp = pgPromise()

const db = pgp(env.DATABASE_URL)

export default db
