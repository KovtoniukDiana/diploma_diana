interface IProps {
    type: 'movie' | 'tv';
    page: number;
    genre?: number;
    year?: string;
    year_gte?: string;
    year_lte?: string;
}

export async function fetchMovies({ type, page, genre, year, year_gte, year_lte }: IProps) {
    const isMovie = type === 'movie';

    const paramsObj: Record<string, string> = {
        language: 'uk-UA',
        page: page.toString(),
        'vote_average.gte': '7',
    };

    if (genre) paramsObj['with_genres'] = genre.toString();
    if (year) {
        paramsObj[isMovie ? 'primary_release_year' : 'first_air_date_year'] = year;
    }
    if (year_gte) {
        paramsObj[isMovie ? 'primary_release_date.gte' : 'first_air_date.gte'] = `${year_gte}-01-01`;
    }
    if (year_lte) {
        paramsObj[isMovie ? 'primary_release_date.lte' : 'first_air_date.lte'] = `${year_lte}-12-31`;
    }

    const params = new URLSearchParams(paramsObj);

    const response = await fetch(
        `https://api.themoviedb.org/3/discover/${type}?${params}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
            },
            next: { revalidate: 3600 },
        }
    );

    if (!response.ok) throw new Error('Failed to fetch movies');
    return response.json();
}
