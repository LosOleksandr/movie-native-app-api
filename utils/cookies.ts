import type { CookieOptions, Response } from 'express'
import env from './env'

const setCookies = (
    res: Response,
    { name, value, options }: { name: string; value: string | Record<string, unknown>; options?: CookieOptions }
) => {
    const cookieValue = typeof value === 'string' ? value : JSON.stringify(value)

    res.cookie(name, cookieValue, {
        httpOnly: true,
        secure: env.APP_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        ...options,
    })
}

export default setCookies

const resetCookies = (res: Response, name: string, options?: CookieOptions) => {
    res.clearCookie(name, { ...options })
}

export { resetCookies, setCookies }
