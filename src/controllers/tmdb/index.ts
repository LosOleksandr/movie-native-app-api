import { GenreController } from './genre'
import { MovieController } from './movie'
import { SearchController } from './search'
import { SeriesController } from './series'

const tmdbControllers = {
    MovieController: new MovieController(),
    GenreController: new GenreController(),
    SeriesController: new SeriesController(),
    SearchController: new SearchController(),
}

export default tmdbControllers
