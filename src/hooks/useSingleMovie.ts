'use client'
import {useState, useEffect} from 'react'
import { fetchSingleMovie } from '../lib/api/singleMovie';
import { IMovieDetails } from '../types/content.details'; 

interface IProps  {
    id: string;
    type: 'movie' | 'tv';
}

export function useSingleMovie( { id, type } : IProps ) {

    const [data, setData] = useState<IMovieDetails | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if(!id) return

        setLoading(true);

        fetchSingleMovie( { id, type } )
            .then(data => {
                setData(data);
                setLoading(false);
        })

    }, [id, type])

    return {data, loading}

}