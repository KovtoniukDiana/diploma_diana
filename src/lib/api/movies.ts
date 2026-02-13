
interface IProps  {
    type: 'movie' | 'tv';
    page: number;
    genre?: number;
}

export async function fetchMovies ({ type, page, genre } : IProps) {

    const params = new URLSearchParams({
        type,
        page: page.toString(),
        rating: '7'
    });

    if (genre) {
        params.append('genre', genre.toString());
    }

    const response = await fetch(`http://localhost:3000/api/movies?${params}`, { 
        cache: 'no-store' 
    });

    if (!response.ok){
        throw new Error('Failed to fetch movies'); 
    }

    return response.json()
} 