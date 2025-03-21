'use client'

import React, { ChangeEvent, useState } from 'react'
import SignupForm from '../components/signup/SignupForm'
import { FormDataPayload } from '../payload/payload'
import { useMutation } from '@tanstack/react-query'
import { signUpUser } from '@/api/users/action'
import { useRouter } from 'next/navigation'



type Props = {}

const Page = (props: Props) => {

  const router = useRouter()

  const [formData, setFormData] = useState<FormDataPayload>({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone_number: '',
    role: 'customer',
    address: '',
    avatar: 'sample.png',
    status: 'active'
  });

  const mutation = useMutation({
    mutationFn: signUpUser,
    onSuccess: () => {
      router.push("/sign-in")
    },
    onError: (err) => {
      console.log('Registration error : ',err)
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', JSON.stringify({formData}));
    mutation.mutate(
      formData
    )
  };

  return (
    <div>
      <SignupForm formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} />
    </div>
  )
}

export default Page