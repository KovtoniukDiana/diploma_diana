interface IProps {
  id: string;
  type: 'movie' | 'tv';
}

export async function fetchSingleMovie({ id, type }: IProps) {
  const params = new URLSearchParams({
    language: 'uk-UA',
    append_to_response: 'credits,videos,images',
  });

  const response = await fetch(
    `https://api.themoviedb.org/3/${type}/${id}?${params}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      },
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) throw new Error('Failed to fetch movie details');
  return response.json();
}
