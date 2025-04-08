import createTables from './tables'

const initDatabase = async () => {
    try {
        await createTables()
        console.log('Your database has been initialized.')
    } catch (error) {
        console.error('Error connecting to database:', error)
    }
}

initDatabase()
