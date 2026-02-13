
interface IProps  {
    id: string;
    type: 'movie' | 'tv';
}

export async function fetchSingleMovie ({ id, type } : IProps) {

    const params = new URLSearchParams({
        type
    });

    
    const response = await fetch(`http://localhost:3000/api/movies/${id}?${params}`, { 
        
        cache: 'no-store' 
    });

    if (!response.ok) {
        throw new Error('Failed to fetch movie details'); 
    }

    return response.json();
} 