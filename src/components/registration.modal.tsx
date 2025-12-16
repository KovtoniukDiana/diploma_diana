'use client'
import CustomModal from "./common/modal"
import RegistrationForm from "./registration.form";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  
}

export default function RegistrationModal({isOpen, onClose}: IProps) {
  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title="Створення акаунту">
        <RegistrationForm onClose={onClose} />
    </CustomModal>
  )
}
