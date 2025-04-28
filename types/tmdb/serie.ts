import type { ImageOptions, Keyword, TMDBListResponse } from './tdmb'

export type SeriesDetails = {
    adult: boolean
    backdrop_path: string | null
    created_by: Array<{
        id: number
        credit_id: string
        name: string
        gender: number
        profile_path: string | null
    }>
    episode_run_time: number[]
    first_air_date: string
    genres: Array<{
        id: number
        name: string
    }>
    homepage: string
    id: number
    in_production: boolean
    languages: string[]
    last_air_date: string
    last_episode_to_air: {
        id: number
        name: string
        overview: string
        vote_average: number
        vote_count: number
        air_date: string
        episode_number: number
        episode_type: string
        production_code: string
        runtime: number | null
        season_number: number
        show_id: number
        still_path: string | null
    } | null
    name: string
    next_episode_to_air: null | unknown
    networks: Array<{
        id: number
        logo_path: string | null
        name: string
        origin_country: string
    }>
    number_of_episodes: number
    number_of_seasons: number
    origin_country: string[]
    original_language: string
    original_name: string
    overview: string
    popularity: number
    poster_path: string | null
    production_companies: Array<{
        id: number
        logo_path: string | null
        name: string
        origin_country: string
    }>
    production_countries: Array<{
        iso_3166_1: string
        name: string
    }>
    seasons: Array<{
        air_date: string
        episode_count: number
        id: number
        name: string
        overview: string
        poster_path: string | null
        season_number: number
        vote_average: number
    }>
    spoken_languages: Array<{
        english_name: string
        iso_639_1: string
        name: string
    }>
    status: 'Ended' | 'Returning Series' | 'Canceled' | 'In Production' | string
    tagline: string
    type: 'Scripted' | 'Reality' | 'Documentary' | string
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

export type DiscoverSeriesParams = {
    language?: string
    sort_by?: SeriesSortBy
    air_date_gte?: string
    air_date_lte?: string
    first_air_date_gte?: string
    first_air_date_lte?: string
    first_air_date_year?: number
    page?: number
    timezone?: string
    vote_average_gte?: number
    vote_average_lte?: number
    vote_count_gte?: number
    vote_count_lte?: number
    with_genres?: string
    with_original_language?: string
    with_watch_providers?: string
    watch_region?: string
    with_networks?: string
    include_null_first_air_dates?: boolean
    include_adult?: boolean
    with_keywords?: string
    without_keywords?: string
    screened_theatrically?: boolean
    with_companies?: string
    without_companies?: string
    with_status?: 'Returning Series' | 'Ended' | 'Canceled'
}

export type SeriesSortBy =
    | 'popularity.asc'
    | 'popularity.desc'
    | 'first_air_date.asc'
    | 'first_air_date.desc'
    | 'vote_average.asc'
    | 'vote_average.desc'
