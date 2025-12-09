'use client'
import { on } from "events";
import CustomModal from "./common/modal"
import LoginForm from "./login.form";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({isOpen, onClose}: IProps) {
  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title="Увійти в акаунт">
        <LoginForm />
    </CustomModal>
  )
}
