import { env as bunEnv } from 'bun'

const checkEnv = (key: string) => {
    if (!bunEnv[key]) {
        throw new Error(`${key} variable is not set`)
    }
    return bunEnv[key]
}

const env = {
    PORT: checkEnv('PORT'),
    POSTGRES_URL: checkEnv('POSTGRES_URL'),
    ACCESS_TOKEN_SECRET: checkEnv('ACCESS_TOKEN_SECRET'),
    REFRESH_TOKEN_SECRET: checkEnv('REFRESH_TOKEN_SECRET'),
    ACCESS_TOKEN_EXPIRES_IN: checkEnv('ACCESS_TOKEN_EXPIRES_IN'),
    REFRESH_TOKEN_EXPIRES_IN: checkEnv('REFRESH_TOKEN_EXPIRES_IN'),
    FRONTEND_URL: checkEnv('FRONTEND_URL'),
    TMBD_BASE_URL: checkEnv('TMBD_BASE_URL'),
    TMDB_API_KEY: checkEnv('TMDB_API_KEY'),
    APP_ENV: checkEnv('APP_ENV'),
}

export default env
