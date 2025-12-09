'use client'
import React, {useState} from 'react'
import {Form, Input} from "@heroui/react";


export default function RegistrationForm() {

    const [formData, setFormData] = useState(
        {
            email: '',
            password: '',
            confirmPassword: ''
        }
    )

    const validateEmail = (email: string) => {
        const emailRegex =  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        return emailRegex.test(email);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
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
    </Form>
  )
}
