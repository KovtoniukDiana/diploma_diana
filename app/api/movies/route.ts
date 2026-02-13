import { NextResponse } from "next/server";


const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const page = searchParams.get('page') || '1';
    const type = searchParams.get('type')  || 'movie';
    const genre = searchParams.get('genre');



    const url = new URL(`https://api.themoviedb.org/3/discover/${type}`)

    url.searchParams.set('api_key', API_KEY!)
    url.searchParams.set('language', 'uk-UA')
    url.searchParams.set('page', page)


    if(genre && genre !== "undefined" && genre !== "null") {
        url.searchParams.set("with_genres", genre)
    }

    const res = await fetch(url.toString(), {
        next: {revalidate: 60},
    })

    if (!res.ok) {
        return NextResponse.json(
          { error: 'Failed to fetch movies' },
          { status: 500 }
        )
    }

    const data = await res.json()

    return NextResponse.json(data)

}