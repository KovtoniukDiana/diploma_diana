'use client'
import CustomModal from "./common/modal"
import RegistrationForm from "./registration.form";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  
}

export default function RegistrationModal({isOpen, onClose}: IProps) {
  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title="Створення акаунту" size="xs" className="bg-pink-100 p-6.25 rounded-md border-2 border-pink-300" >
        <RegistrationForm onClose={onClose} />
    </CustomModal>
  )
}
