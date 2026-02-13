'use client'
import {useState, useEffect} from 'react'
import { fetchMovies } from '../lib/api/movies'
import { IMovie } from '../types/movies';

interface IProps  {
    type: 'movie' | 'tv';
    page?: number;
    genre?: number
}

export function useMovies( { type, page = 1, genre } : IProps ) {

    const [data, setData] = useState<IMovie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        fetchMovies( { type, page, genre } )
            .then(data => {
                setData(data.results || []);
                setLoading(false);
        })

    }, [type, page, genre])

    return {data, loading}

}