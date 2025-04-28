import tmdbContollers from '@/controllers/tmdb'
import wrapper from '@/middlewares/wrapper'
import { Router } from 'express'

const tmdbRouter = Router()

const { MovieController, SeriesController, SearchController, GenreController } = tmdbContollers

tmdbRouter.get('/movies', wrapper(MovieController.getMovies.bind(MovieController)))
tmdbRouter.get('/movies/:id', wrapper(MovieController.getMovieDetails.bind(MovieController)))
tmdbRouter.get('/series', wrapper(SeriesController.getSeries.bind(SeriesController)))
tmdbRouter.get('/series/:id', wrapper(SeriesController.getSerieDetails.bind(SeriesController)))
tmdbRouter.get('/search', wrapper(SearchController.getSearchResults.bind(SearchController)))
tmdbRouter.get('/genres', wrapper(GenreController.getGenres.bind(GenreController)))

export default tmdbRouter
