type TMDBListItem = {
    adult: boolean
    backdrop_path: string | null
    genre_ids: number[]
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string | null
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}

type TMDBListResponse = {
    page: number
    results: TMDBListItem[]
    total_pages: number
    total_results: number
}

type ImageOptions = {
    aspect_ratio: number | null
    height: number | null
    iso_639_1: string | null
    file_path: string | null
    vote_average: number
    vote_count: number
    width: number | null
}

type Keyword = {
    id: number
    name: string
}

type Genre = {
    id: number
    name: string
}

type GenreResponse = Genre[]

export enum TMDB_API_ROUTES {
    DISCOVER_MOVIES = '/discover/movie',
    DISCOVER_SERIES = '/discover/tv',
    FIND_MOVIE_BY_ID = '/movie',
    FIND_SERIE_BY_ID = '/tv',
    SEARCH = '/search/multi',
    GENRES = '/genre/movie/list',
}

type SearchTMDBParams = {
    query?: string
    page?: number
    include_adult?: boolean
    language?: string
}

type Credits = {
    id: number
    cast: CastMember[]
    crew: CrewMember[]
}

type CastMember = {
    adult: boolean
    gender: number | null
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path: string | null
    cast_id?: number
    character: string
    credit_id: string
    order?: number
}

type CrewMember = {
    adult: boolean
    gender: number | null
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path: string | null
    credit_id: string
    department: string
    job: string
}

type DetailsParams = {
    append_to_response?: string
    language?: string
}
export type {
    Credits,
    DetailsParams,
    Genre,
    GenreResponse,
    ImageOptions,
    Keyword,
    SearchTMDBParams,
    TMDBListItem,
    TMDBListResponse,
}
