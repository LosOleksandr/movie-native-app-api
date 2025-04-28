import { SearchService } from '@/services/tmdb'
import type { Request, Response } from 'express'

export class SearchController {
    private readonly searchService: SearchService = new SearchService()

    public async getSearchResults(req: Request, res: Response) {
        const result = await this.searchService.gerSearchResults(req.query)

        res.status(200).json(result)
    }
}
