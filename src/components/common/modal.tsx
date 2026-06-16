'use client'
import {Modal, ModalContent, ModalHeader, ModalBody} from "@heroui/react";
import { ReactNode } from "react";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    title?: string;
    size?: "xs" | "sm" | "md" | "lg"| "xl" | "5xl";
    className?: string;
}

export default function CustomModal({isOpen, onClose, children, title, size, className }: IProps) {

  return (

        <Modal backdrop='blur' isOpen={isOpen} onClose={onClose} size={size} className={className} >
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>

                <ModalBody>
                    {children}
                </ModalBody>

            </ModalContent>
        </Modal>
  )
}
