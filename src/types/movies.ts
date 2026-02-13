
export interface IMovie {
    id: number,
    title?: string,
    name?: string;
    vote_average: number,
    poster_path: string
}

export interface IMovieResponse {
    page: number,
    results: IMovie[]    
}