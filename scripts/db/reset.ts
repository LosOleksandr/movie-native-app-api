import { sql } from 'bun'

const clearDatabase = async () => {
    try {
        const tables = await sql`
            SELECT tablename 
            FROM pg_tables 
            WHERE schemaname = 'public';
        `

        const tableNames = tables.map((row: { tablename: string }) => row.tablename).reverse()

        for (const tableName of tableNames) {
            if (['migrations', 'audit_log'].includes(tableName)) continue

            await sql`
                TRUNCATE TABLE ${sql(tableName)} RESTART IDENTITY CASCADE;
            `
            console.log(`Table ${tableName} has been truncated.`)
        }

        console.log('Your data has been reset successfully.')
    } catch (err) {
        console.error('Error resetting database:', err)
    }
}

clearDatabase()
