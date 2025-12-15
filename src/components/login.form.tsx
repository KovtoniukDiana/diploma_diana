'use client'
import React, {useState} from 'react'
import {Form, Input } from "@heroui/react";
import GoogleSignInButton from './googleSignInButton';


export default function RegistrationForm() {

    const [formData, setFormData] = useState(
        {
            email: '',
            password: ''
        }
    )

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

        }}  />

        <Input isRequired name='password' placeholder='Введіть пароль' value={formData.password} type='password'
        classNames={{inputWrapper: 'bg-default-100', input: 'text-sm focus: outline-none'}}
        onChange={(e) => setFormData({...formData, password: e.target.value})}
        validate={(value) => {
            if(!value) return "Пароль обов'язковий"
            if(value.length < 6) return "Пароль має містити мінімум 6 символів"
            return null;

        }}  />

        <GoogleSignInButton />

    </Form>
  )
}
