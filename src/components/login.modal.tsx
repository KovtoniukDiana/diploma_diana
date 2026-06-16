'use client'
import CustomModal from "./common/modal"
import LoginForm from "./login.form";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({isOpen, onClose}: IProps) {
  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title="Увійти в акаунт" size="xs" className="bg-pink-100 p-6.25 rounded-md border-2 border-pink-300" >
        <LoginForm onClose={onClose} />
    </CustomModal>
  )
}
