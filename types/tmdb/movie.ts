import type { GenreResponse, ImageOptions, Keyword, TMDBListResponse } from './tdmb'

type MovieDetails = {
    adult: boolean
    backdrop_path: string | null
    belongs_to_collection: {
        id: number
        name: string
        poster_path: string | null
        backdrop_path: string | null
    } | null
    budget: number
    genres: GenreResponse
    homepage: string | null
    id: number
    imdb_id: string | null
    original_language: string
    original_title: string
    overview: string | null
    popularity: number
    poster_path: string | null
    production_companies: {
        id: number
        logo_path: string | null
        name: string
        origin_country: string
    }[]
    production_countries: {
        iso_3166_1: string
        name: string
    }[]
    release_date: string
    revenue: number
    runtime: number | null
    spoken_languages: {
        english_name: string
        iso_639_1: string
        name: string
    }[]
    status: 'Rumored' | 'Planned' | 'In Production' | 'Post Production' | 'Released' | 'Canceled'
    tagline: string | null
    title: string
    video: boolean
    vote_average: number
    vote_count: number
    similar?: TMDBListResponse
    keywords?: {
        keywords: Keyword[]
    }
    images?: {
        backdrops: ImageOptions[]
        logos: ImageOptions[]
        posters: ImageOptions[]
    }
}

type DiscoverMoviesParams = {
    include_adult?: boolean
    include_video?: boolean
    language?: string
    page?: number
    sort_by?: MoviesSortBy
    primary_release_year?: number
    primary_release_date_gte?: string
    primary_release_date_lte?: string
    release_date_gte?: string
    release_date_lte?: string
    region?: string
    vote_average_gte?: number
    vote_average_lte?: number
    vote_count_gte?: number
    vote_count_lte?: number
    with_cast?: string
    with_crew?: string
    with_companies?: string
    with_genres?: string
    with_keywords?: string
    with_origin_country?: string
    with_original_language?: string
    with_people?: string
    year?: number
    certification_country?: string
    certification?: string
    certification_lte?: string
    certification_gte?: string
    include_null_first_air_dates?: boolean
}

type MoviesSortBy =
    | 'popularity.asc'
    | 'popularity.desc'
    | 'release_date.asc'
    | 'release_date.desc'
    | 'revenue.asc'
    | 'revenue.desc'
    | 'primary_release_date.asc'
    | 'primary_release_date.desc'
    | 'original_title.asc'
    | 'original_title.desc'
    | 'vote_average.asc'
    | 'vote_average.desc'
    | 'vote_count.asc'
    | 'vote_count.desc'

export type { DiscoverMoviesParams, MovieDetails, MoviesSortBy }
