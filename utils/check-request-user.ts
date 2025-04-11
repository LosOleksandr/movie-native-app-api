import type { DecodedUser } from '@/types/user'
import ServerError from './server-error'

const checkRequestUser = (user?: DecodedUser) => {
    if (!user) {
        throw ServerError.unauthorized('User not found')
    }

    return user
}

export default checkRequestUser
