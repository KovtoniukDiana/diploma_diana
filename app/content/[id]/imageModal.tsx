'use client'
import { useState } from "react"
import { Image } from "@heroui/react"
import CustomModal from "@/src/components/common/modal"

interface IProps {
    backdrops: { file_path: string }[]
}

export default function ImageModal({ backdrops }: IProps) {
    const [openModal, setOpenModal] = useState(false)
    const [selectedImg, setSelectedImg] = useState("")

    const openImage = (path: string) => {
        setSelectedImg(`https://image.tmdb.org/t/p/original${path}`)
        setOpenModal(true)
    }

    return (
        <div>
            <h3 className="text-2xl font-bold mb-4 text-left">Кадри з кінострічки</h3>
            <div className="grid grid-cols-4 md:grid-cols-5 gap-4">
                {backdrops.map((img, index) => (
                    <Image
                        key={index}
                        src={`https://image.tmdb.org/t/p/w780${img.file_path}`}
                        className="rounded-2xl hover:scale-105 transition-transform cursor-pointer"
                        alt="Movie frame"
                        onClick={() => openImage(img.file_path)}
                    />
                ))}
            </div>

            <CustomModal isOpen={openModal} onClose={() => setOpenModal(false)} size="5xl">
                <div className="flex justify-center items-center">
                    <img
                        src={selectedImg}
                        alt="Full frame"
                        className="w-full h-auto rounded-xl shadow-xl"
                    />
                </div>
            </CustomModal>
        </div>
    )
}
