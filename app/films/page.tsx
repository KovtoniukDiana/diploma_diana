import ContentGrid from "@/src/components/common/content.grid"

interface IProps {
    searchParams: Promise<{
        page?: string;
        genre?: string;
        year?: string;
        year_gte?: string;
        year_lte?: string;
        tab?: string;
    }>
}

export default async function FilmsPage({ searchParams }: IProps) {
    const params = await searchParams;
    const page = Number(params.page) || 1;
    const genre = params.genre ? Number(params.genre) : undefined;

    return (
        <ContentGrid
            type="movie"
            page={page}
            genre={genre}
            year={params.year}
            year_gte={params.year_gte}
            year_lte={params.year_lte}
        />
    )
}

