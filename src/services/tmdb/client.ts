import env from '@utils/env'
import ServerError from '@utils/server-error'
import axios, { AxiosError, type AxiosInstance } from 'axios'

export class ClientService {
    private readonly API_KEY = env.TMDB_API_KEY
    private readonly API_BASE_URL = env.TMBD_BASE_URL

    public client: AxiosInstance

    constructor() {
        this.client = this.createClient()
        this.setupInterceptors()
    }

    private createClient(): AxiosInstance {
        return axios.create({
            baseURL: this.API_BASE_URL,
            headers: {
                Authorization: `Bearer ${this.API_KEY}`,
                'Content-Type': 'application/json',
            },
        })
    }

    private setupInterceptors() {
        this.client.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error instanceof AxiosError) {
                    throw new ServerError(error.message, error.status || 500, error.cause, error.name)
                }
                throw error
            }
        )
    }
}
