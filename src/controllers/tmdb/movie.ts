import { MovieService } from '@/services/tmdb'
import ServerError from '@utils/server-error'
import type { Request, Response } from 'express'

export class MovieController {
    private readonly movieService: MovieService = new MovieService()

    public async getMovies(req: Request, res: Response) {
        const result = await this.movieService.getMovies(req.query)

        res.status(200).json(result)
    }

    public async getMovieDetails(req: Request, res: Response) {
        const { id } = req.params

        if (!id) {
            throw ServerError.badRequest('Id not provided')
        }
        const result = await this.movieService.getMovieById(id, req.query)

        res.status(200).json(result)
    }
}
