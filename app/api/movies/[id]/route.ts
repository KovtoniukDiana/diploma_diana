import { NextResponse } from "next/server";


const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;


export async function GET(request: Request, { params }: { params: { id: string } }) {

    const { id } = await params; 
    const { searchParams } = new URL(request.url);


    const type = searchParams.get('type') || 'movie';


    const url = new URL(`https://api.themoviedb.org/3/${type}/${id}`);

    url.searchParams.set('api_key', API_KEY!);
    url.searchParams.set('language', 'uk-UA');
    url.searchParams.set('append_to_response', 'videos,credits'); // Додаємо відео та акторів

    try {
        const res = await fetch(url.toString(), {

            next: { revalidate: 3600 }, 
        });

        if (!res.ok) {

            return NextResponse.json(
                { error: 'Movie not found' },
                { status: res.status }
            );
        }

        const data = await res.json();

        return NextResponse.json(data);

    } catch (error) {
        
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}


