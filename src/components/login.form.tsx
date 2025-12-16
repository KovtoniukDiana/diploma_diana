'use client'
import React, {useState} from 'react'
import {Form, Input, Button } from "@heroui/react";
import GoogleSignInButton from './googleSignInButton';
import { signIn } from 'next-auth/react';

interface IProps {
    onClose: () => void;
}

export default function RegistrationForm({onClose}: IProps) {

    const [formData, setFormData] = useState(
        {
            email: '',
            password: ''
        }
    )

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = await signIn('credentials', {
            redirect: false,
            email: formData.email,
            password: formData.password,
        })

        if (result?.error) {
            console.error("Login failed:", result.error);
        } else {
            onClose();
        }

    }

  return (
    <Form className='w-full' onSubmit={handleSubmit} >
        <Input placeholder='Email' isRequired name='email' value={formData.email}
        classNames={{inputWrapper: 'bg-default-100', input: 'text-sm focus: outline-none'}}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        validate={(value) => {
            if(!value) return "Пошта обов'язкова"

        }}  />

        <Input isRequired name='password' placeholder='Введіть пароль' value={formData.password} type='password'
        classNames={{inputWrapper: 'bg-default-100', input: 'text-sm focus: outline-none'}}
        onChange={(e) => setFormData({...formData, password: e.target.value})}
        validate={(value) => {
            if(!value) return "Пароль обов'язковий"
            if(value.length < 6) return "Пароль має містити мінімум 6 символів"
            return null;

        }}  />

        <div className='flex justify-between'>
            <Button color="danger" variant="light" onPress={onClose}>
                Закрити
            </Button>
            <Button color="primary" type='submit'>
                Продовжити
            </Button>
        </div>

        <GoogleSignInButton />

    </Form>
  )
}
