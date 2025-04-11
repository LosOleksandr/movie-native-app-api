import { sql } from 'bun'
import { readdirSync } from 'fs'
import { join } from 'path'

const MIGRATIONS_DIR = './migrations'

const runMigrations = async () => {
    await sql`
        CREATE TABLE IF NOT EXISTS migrations (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL UNIQUE,
            applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `

    const appliedMigrations: { name: string }[] = await sql`
    SELECT name FROM migrations
  `

    const appliedNames = new Set(appliedMigrations.map((m) => m.name))

    const allMigrations = readdirSync(MIGRATIONS_DIR)
        .filter((name) => name.endsWith('.sql'))
        .sort()

    for (const file of allMigrations) {
        if (appliedNames.has(file)) continue

        console.log(`🔧 Applying migration: ${file}`)

        const path = join(MIGRATIONS_DIR, file)

        try {
            await sql.begin(async (tx) => {
                await tx`SELECT pg_advisory_lock(1);`

                await tx.file(path)
                await tx`INSERT INTO migrations (name) VALUES (${file})`

                await tx`SELECT pg_advisory_unlock(1);`
            })
        } catch (err) {
            console.error(`❌ Failed migration: ${file}\n`, err)
            throw err
        }
    }

    console.log('✅ All migrations applied')
}

const pullMigrations = async () => {
    try {
        await runMigrations()
        console.log('Your database has been initialized.')
    } catch (error) {
        console.error('Error connecting to database:', error)
    }
}

pullMigrations()
