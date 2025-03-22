'use client'

import { getCurrentUser } from '@/api/users/action'
import { getLocalStorage } from '@/app/utils/localStorage'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'

type Props = {}

const Header = (props: Props) => {

    const [username, setUsername] = useState<string>("SAMPLE")
    const [token, setToken] = useState<string>("")

    useEffect(()=>{
        const accessToken = getLocalStorage('access_token') as string
        setToken(accessToken)
    },[])
      
    const { data, isLoading, isError } = useQuery({
        queryKey: ['current-user'],
        queryFn: () => getCurrentUser(token),
    })
    if (isError) return <>Error while fetching current user</>
    if (isLoading) return <>Loading...</>

    return (
        <div>{data.data.email}</div>
    )
}

export default Header