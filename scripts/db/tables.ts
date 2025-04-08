import { sql } from 'bun'

const createTables = async () => {
    const createUsersTableQuery = sql`
        CREATE TABLE IF NOT EXISTS users (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            username VARCHAR(100) NOT NULL UNIQUE,
            email VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(100) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `

    const createSessionsTableQuery = sql`
        CREATE TABLE IF NOT EXISTS sessions (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id UUID NOT NULL REFERENCES users(id),
            token VARCHAR(100) NOT NULL UNIQUE,
            expired_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `

    const createProfilesTableQuery = sql`
        CREATE TABLE IF NOT EXISTS profiles (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id UUID NOT NULL REFERENCES users(id),
            name VARCHAR(100),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `

    await sql.begin(async (tx) => {
        await tx`${createUsersTableQuery}`
        await tx`${createSessionsTableQuery}`
        await tx`${createProfilesTableQuery}`
    })
}

export default createTables
