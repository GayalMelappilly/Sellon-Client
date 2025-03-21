'use server'

import { FormDataPayload, LoginFormDataPayload } from "@/app/payload/payload";

const apiUrl = process.env.API_URL

export const signUpUser = async (userData: FormDataPayload) => {
    console.log('USER DATA : ',userData)
    const res = await fetch(`${apiUrl}/sign-up/`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });

    if(!res.ok){
        const errorData = await res.json();
        console.log("User sign up error", errorData)
        throw new Error(JSON.stringify(errorData))
    }
    return res.json();
}

export const LoginUser = async (userData: LoginFormDataPayload) => {
    console.log("USER DATA : ", userData)
    const res = await fetch(`${apiUrl}/login/`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    })

    if(!res.ok){
        const errorData = await res.json();
        console.log("User login error", errorData)
        throw new Error(JSON.stringify(errorData))
    }
    return res.json();
}