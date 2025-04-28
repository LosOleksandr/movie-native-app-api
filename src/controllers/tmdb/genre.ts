import { GenreService } from '@/services/tmdb'
import type { Request, Response } from 'express'

export class GenreController {
    private readonly genreService: GenreService = new GenreService()

    public async getGenres(req: Request, res: Response) {
        const result = await this.genreService.getGenres(req.query)

        res.status(200).json(result)
    }
}
