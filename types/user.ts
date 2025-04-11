import type { JwtPayload } from 'jsonwebtoken'

type User = {
    id: string
    email: string
    password: string
    createdAt: Date
    updatedAt: Date
}

type DecodedUser = {
    id: string
    email: string
} & JwtPayload

type Profile = {
    id: string
    userId: string
    first_name: string
    last_name: string
    personal_status: string
    createdAt: Date
    updatedAt: Date
}

export type { DecodedUser, Profile, User }
