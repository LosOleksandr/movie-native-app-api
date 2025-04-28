import {
    TMDB_API_ROUTES,
    type DetailsParams,
    type DiscoverMoviesParams,
    type MovieDetails,
    type TMDBListResponse,
} from '@/types/tmdb'
import { ClientService } from './client'

export class MovieService {
    private readonly client = new ClientService().client

    public async getMovies(params: DiscoverMoviesParams = {}): Promise<TMDBListResponse> {
        const movies = await this.client.get<TMDBListResponse>(TMDB_API_ROUTES.DISCOVER_MOVIES, { params })

        return movies.data
    }

    public async getMovieById(id: string, params: DetailsParams = {}): Promise<MovieDetails> {
        const movie = await this.client.get<MovieDetails>(`${TMDB_API_ROUTES.FIND_MOVIE_BY_ID}/${id}`, { params })

        return movie.data
    }
}
