const checkEnv = (key: string) => {
    if (!process.env[key]) {
        throw new Error(`${key} variable is not set`)
    }
    return process.env[key]
}

const env = {
    PORT: checkEnv('PORT'),
    DATABASE_URL: checkEnv('DATABASE_URL'),
    NODE_ENV: process.env.NODE_ENV,
}

export default env
