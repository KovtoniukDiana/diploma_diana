'use client'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@heroui/react";
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

        <Modal backdrop='blur' isOpen={isOpen} onClose={onClose} size={size}>
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>

                <ModalBody>
                    {children}
                </ModalBody>

                <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                        Закрити
                    </Button>
                    <Button color="primary" onPress={onClose}>
                        Продовжити
                    </Button>
                </ModalFooter>

            </ModalContent>
        </Modal>
  )
}
