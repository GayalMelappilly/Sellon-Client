'use client'

import { getAllCategories } from '@/pages/api/products/action'
import { useQuery } from '@tanstack/react-query'
import { ArrowUp, ArrowDown } from "lucide-react";
import React, { useEffect, useRef, useState } from 'react'

type Props = {}

const Categories = (props: Props) => {

    const [allCategories, setAllCategories] = useState<string[]>()
    const [categories, setCategories] = useState<string[]>();
    const [show, setShow] = useState<boolean>(false)
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const categoryWidth =
                scrollRef.current.firstElementChild?.getBoundingClientRect().width || 0;

            scrollRef.current.scrollBy({
                left: direction === "right" ? categoryWidth + 4 : -(categoryWidth + 4), // Adding gap size
                behavior: "smooth",
            });
        }
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: ['get-categories'],
        queryFn: () => getAllCategories()
    })

    useEffect(() => {
        if (data && data.categories) {
            console.log("CATEGORIES  : ", data)
            setAllCategories(data.categories)
            setCategories(data.categories.slice(0,5))
        }
    }, [data])

    const HandleShow = () => {
        setShow(!show)
        if(show){
            setCategories(allCategories?.slice(0,5))
        }else{
            setCategories(allCategories)
        }
    }

    return (
        <div className={`relative px-36 pt-8 w ${show ? 'bg-black/5' : null}`}>
            <div ref={scrollRef} className="grid grid-cols-5 gap-4 mx-14 rounded-md">
                {categories &&
                    categories.map((category: any) => (
                        <p key={category.name} className="rounded-md bg-sky-300/20 p-2 h-fit hover:scale-105 duration-300 min-w-40 text-center whitespace-nowrap cursor-pointer">
                            {category.name}
                        </p>
                    ))
                }
                <p className='cursor-pointer absolute right-36 bottom-0 bg-sky-300/20 p-2 w-fit rounded-md' onClick={HandleShow}>{show ? <ArrowUp/> : <ArrowDown/>}</p>
            </div>
        </div>
    )
}

export default Categories