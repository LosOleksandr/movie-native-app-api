import { TMDB_API_ROUTES, type SearchTMDBParams, type TMDBListResponse } from '@/types/tmdb'
import { ClientService } from './client'

export class SearchService {
    private readonly client = new ClientService().client

    public async gerSearchResults(params: SearchTMDBParams = {}): Promise<TMDBListResponse> {
        const searchResult = await this.client.get<TMDBListResponse>(TMDB_API_ROUTES.SEARCH, { params })

        return searchResult.data
    }
}
