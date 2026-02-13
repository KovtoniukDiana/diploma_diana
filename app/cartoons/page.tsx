'use client'
import { useState } from "react"
import ContentGrid from "@/src/components/common/content.grid"
import {Tabs, Tab, Card, CardBody} from "@heroui/react";


export default function CartoonssPage() {

    const [contentType, setContentType] = useState<'movie' | 'tv'>('movie');

    return (

        <>
            
            <Tabs aria-label="Options" variant='bordered'
                classNames={{
                    base: "w-[85%] justify-start mt-4 mb-8",
                    tabList: "bg-white/65 backdrop-blur-sm p-1.5 rounded-2xl shadow-sm border border-white/50",
                    cursor: "bg-white shadow-md rounded-xl",
                    tab: "h-10 px-6",
                    tabContent: "group-data-[selected=true]:text-pink-500 text-gray-600 font-medium transition-all duration-300"
                }}
            >
                <Tab key="photos" title="Мультфільми" onClick={() => setContentType('movie')} />
                
                <Tab key="music" title="Мультсеріали" onClick={() => setContentType('tv')} />
            </Tabs>
            
            

            <ContentGrid type={contentType} genre={16} />
        </>
    )
}