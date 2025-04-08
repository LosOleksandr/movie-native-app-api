import { sql } from 'bun'

const clearDatabase = async () => {
    try {
        const tables = await sql`
            SELECT tablename 
            FROM pg_tables 
            WHERE schemaname = 'public';
        `

        for (const row of tables) {
            const tableName = row.tablename
            await sql`TRUNCATE TABLE ${sql(tableName)} RESTART IDENTITY CASCADE;`
        }

        console.log('Your data has been reset.')
    } catch (err) {
        console.error('Error resetting database:', err)
    }
}

clearDatabase()
