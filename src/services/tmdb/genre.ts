import { TMDB_API_ROUTES, type GenreResponse, type SearchTMDBParams } from '@/types/tmdb'
import { ClientService } from './client'

export class GenreService {
    private readonly client = new ClientService().client

    public async getGenres(params: Pick<SearchTMDBParams, 'language'> = {}): Promise<GenreResponse> {
        const genres = await this.client.get<GenreResponse>(TMDB_API_ROUTES.GENRES, { params })

        return genres.data
    }
}
