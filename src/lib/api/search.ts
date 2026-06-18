interface IProps {
    query: string;
    page?: number;
}

export async function fetchSearchMulti({ query, page = 1 }: IProps) {
    const params = new URLSearchParams({
        query,
        language: 'uk-UA',
        page: page.toString(),
        include_adult: 'false',
    });

    const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?${params}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
            },
            next: { revalidate: 3600 },
        }
    );

    if (!response.ok) throw new Error('Failed to fetch search results');
    const data = await response.json();

    return {
        ...data,
        results: (data.results ?? []).filter(
            (item: any) => item.media_type === 'movie' || item.media_type === 'tv'
        ),
    };
}
