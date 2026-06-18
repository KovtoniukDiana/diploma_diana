'use client'
import { useRouter } from 'next/navigation'
import { Tabs, Tab } from '@heroui/react'

interface IProps {
    activeTab: 'movie' | 'tv'
}

export default function CartoonTabs({ activeTab }: IProps) {
    const router = useRouter()

    return (
        <Tabs
            aria-label="Options"
            variant='bordered'
            selectedKey={activeTab}
            onSelectionChange={(key) => router.push(`?tab=${key}&page=1`)}
            classNames={{
                base: "w-[85%] justify-start mt-4 mb-8",
                tabList: "bg-white/65 backdrop-blur-sm p-1.5 rounded-2xl shadow-sm border border-white/50 w-full sm:w-fit",
                cursor: "bg-white shadow-md rounded-xl",
                tab: "h-10 px-3 sm:px-6 text-sm sm:text-base flex-1 sm:flex-initial",
                tabContent: "group-data-[selected=true]:text-pink-500 text-gray-600 font-medium transition-all duration-300"
            }}
        >
            <Tab key="movie" title="Мультфільми" />
            <Tab key="tv" title="Мультсеріали" />
        </Tabs>
    )
}
