import ContentGrid from "@/src/components/common/content.grid"
import CartoonTabs from "./cartoonTabs"

interface IProps {
    searchParams: Promise<{
        page?: string;
        tab?: string;
    }>
}

export default async function CartoonssPage({ searchParams }: IProps) {
    const params = await searchParams;
    const contentType = params.tab === 'tv' ? 'tv' : 'movie';
    const page = Number(params.page) || 1;

    return (
        <>
            <CartoonTabs activeTab={contentType} />
            <ContentGrid type={contentType} genre={16} page={page} />
        </>
    )
}
