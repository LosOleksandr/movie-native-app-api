import type { AuthCredentials } from '@/types/auth'
import type { User } from '@/types/user'
import ServerError from '@utils/server-error'
import { password as bunPassword, sql, type Password } from 'bun'

export default class UserService {
    private readonly passwordService: typeof bunPassword = bunPassword

    private async hashPassword(password: string): Promise<string> {
        const hashOptions: Password.Argon2Algorithm = {
            algorithm: 'argon2id',
            memoryCost: 4096,
            timeCost: 4,
        }

        return this.passwordService.hash(password, hashOptions)
    }

    public async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return this.passwordService.verify(password, hashedPassword)
    }

    public async getUserById(id: string): Promise<Omit<User, 'password'> | null> {
        const [user]: [Omit<User, 'password'>] | [] =
            await sql`SELECT id, email, created_at, updated_at FROM users WHERE id = ${id}`

        return user ?? null
    }

    public async getUserByEmail(email: string): Promise<User | null> {
        const [user]: [User] | [] = await sql`SELECT * FROM users WHERE email = ${email}`

        return user ?? null
    }

    public async createUser(body: AuthCredentials): Promise<Omit<User, 'password'>> {
        const { email, password } = body

        const user = await this.getUserByEmail(email)

        if (user) {
            throw ServerError.badRequest('User already exists')
        }

        const hashedPassword = await this.hashPassword(password)

        const userData: AuthCredentials = {
            email,
            password: hashedPassword,
        }

        const [newUser]: [Omit<User, 'password'>] =
            await sql`INSERT INTO users ${sql(userData)} RETURNING id, email, created_at, updated_at`

        return newUser
    }
}
