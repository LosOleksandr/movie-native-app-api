import type { Request } from 'express'
import type { DecodedUser } from './user'

type AuthCredentials = {
    email: string
    password: string
}

type AuthRequest = {
    user?: DecodedUser
} & Request

export type { AuthCredentials, AuthRequest }
