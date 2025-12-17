'use client'
import React, {useState} from 'react'
import {Form, Input, Button} from "@heroui/react";
import GoogleSignInButton from './googleSignInButton';
import { signIn } from "next-auth/react";

interface IProps {
    onClose: () => void;
}


export default function RegistrationForm({onClose}: IProps) {

    const [formData, setFormData] = useState(
        {
            email: '',
            password: '',
            confirmPassword: ''
        }
    )
    const [isLoading, setIsLoading] = useState(false);

    const validateEmail = (email: string) => {
        const emailRegex =  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        return emailRegex.test(email);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json();

            const signInResult = await signIn("credentials", {
                email: formData.email,
                password: formData.password,
                redirect: false,
                });

                if (signInResult?.error) {
                throw new Error(signInResult.error);
            }

            
        } catch (error) {
            console.error("Error during registration:", error);
        }
    }

  return (
    <Form className='w-full' onSubmit={handleSubmit} >
        <Input placeholder='Email' isRequired name='email' value={formData.email}
        classNames={{inputWrapper: 'bg-default-100', input: 'text-sm focus: outline-none'}}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        validate={(value) => {
            if(!value) return "Пошта обов'язкова"
            if(!validateEmail(value)) return "Некоректна поштова адреса"

        }}  />

        <Input isRequired name='password' placeholder='Введіть пароль' value={formData.password} type='password'
        classNames={{inputWrapper: 'bg-default-100', input: 'text-sm focus: outline-none'}}
        onChange={(e) => setFormData({...formData, password: e.target.value})}
        validate={(value) => {
            if(!value) return "Пароль обов'язковий"
            if(value.length < 6) return "Пароль має містити мінімум 6 символів"
            return null;

        }}  />


        <Input isRequired name='confirmPassword' placeholder='Підтвердьте пароль' value={formData.confirmPassword} type='password'
        classNames={{inputWrapper: 'bg-default-100', input: 'text-sm focus: outline-none'}}
        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
        validate={(value) => {
            if(!value) return "Підтвердження обов'язкове"
            if(value !== formData.password) return "Паролі не збігаються"
            return null;

        }}  />

        <div className='flex justify-between'>
            <Button color="danger" variant="light" onPress={onClose}>
                Закрити
            </Button>
            <Button color="primary" type='submit' onPress={onClose}>
                Продовжити
            </Button>
        </div>

        <GoogleSignInButton />
    </Form>
  )
}
