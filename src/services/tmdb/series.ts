import {
    TMDB_API_ROUTES,
    type DetailsParams,
    type DiscoverMoviesParams,
    type SeriesDetails,
    type TMDBListResponse,
} from '@/types/tmdb'
import { ClientService } from './client'

export class SeriesService {
    private readonly client = new ClientService().client

    public async getSeries(params: DiscoverMoviesParams = {}): Promise<TMDBListResponse> {
        const movies = await this.client.get<TMDBListResponse>(TMDB_API_ROUTES.DISCOVER_SERIES, { params })

        return movies.data
    }

    public async getSerieById(id: string, params: DetailsParams = {}): Promise<SeriesDetails> {
        const movie = await this.client.get<SeriesDetails>(`${TMDB_API_ROUTES.FIND_SERIE_BY_ID}/${id}`, { params })

        return movie.data
    }
}
