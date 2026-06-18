import { NextRequest, NextResponse } from 'next/server';
import { fetchSearchMulti } from '@/src/lib/api/search';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.trim() ?? '';

    if (!query) {
        return NextResponse.json({ results: [] });
    }

    try {
        const data = await fetchSearchMulti({ query, page: 1 });
        return NextResponse.json({ results: (data.results ?? []).slice(0, 6) });
    } catch (error) {
        console.error('Search API error:', error);
        return NextResponse.json({ results: [] }, { status: 500 });
    }
}
