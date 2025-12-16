'use client'
import {Modal, ModalContent, ModalHeader, ModalBody} from "@heroui/react";
import { ReactNode } from "react";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    title: string;
    size?: "xs" | "sm" | "md" | "lg"| "xl";
}

export default function CustomModal({isOpen, onClose, children, title, size='xs' }: IProps) {

  return (

        <Modal backdrop='blur' isOpen={isOpen} onClose={onClose} size={size} className="bg-pink-100 p-[25px] rounded-md border-2 border-pink-300" >
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>

                <ModalBody>
                    {children}
                </ModalBody>

            </ModalContent>
        </Modal>
  )
}
