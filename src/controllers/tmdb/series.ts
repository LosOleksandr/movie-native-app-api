import { SeriesService } from '@/services/tmdb'
import ServerError from '@utils/server-error'
import type { Request, Response } from 'express'

export class SeriesController {
    private readonly seriesService: SeriesService = new SeriesService()

    public async getSeries(req: Request, res: Response) {
        const result = await this.seriesService.getSeries(req.query)

        res.status(200).json(result)
    }

    public async getSerieDetails(req: Request, res: Response) {
        const { id } = req.params

        if (!id) {
            throw ServerError.badRequest('Id not provided')
        }
        const result = await this.seriesService.getSerieById(id, req.query)

        res.status(200).json(result)
    }
}
