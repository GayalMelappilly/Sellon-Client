'use client'

import React, { useState } from 'react'
import LoginForm from '../components/login/LoginForm'
import { LoginFormDataPayload } from '../payload/payload';
import { useMutation } from '@tanstack/react-query';
import { LoginUser } from '@/api/users/action';
import { useRouter } from 'next/navigation';

type Props = {}

const Page = (props: Props) => {
  
  const router = useRouter() 

  const [loginData, setLoginData] = useState<LoginFormDataPayload>({
    identifier: '',
    password: ''
  });

  const mutation = useMutation({
    mutationFn: LoginUser,
    onSuccess: ()=>{
      router.push("/")
    },
    onError: (err)=>{
      console.log("Error while logging in user",err)
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    console.log('LOGIN DATA : ',loginData)
    e.preventDefault();
    mutation.mutate(
      loginData
    )
  };

  return (
    <div>
      <LoginForm loginData={loginData} setLoginData={setLoginData} handleSubmit={handleSubmit} />
    </div>
  )
}

export default Page