'use client'

import { getAllCategories } from '@/pages/api/products/action'
import { useQuery } from '@tanstack/react-query'
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";
import React, { useEffect, useRef, useState } from 'react'

type Props = {}

const Categories = (props: Props) => {

    const [categories, setCategories] = useState<string[]>()
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
          const categoryWidth =
            scrollRef.current.firstElementChild?.getBoundingClientRect().width || 0;
    
          scrollRef.current.scrollBy({
            left: direction === "right" ? categoryWidth + 16 : -(categoryWidth + 16), // Adding gap size
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
            setCategories(data.categories)
        }
    }, [data])

    return (
        <div className="relative mx-36">
            <button onClick={() => scroll("left")} className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-300 p-2 rounded-full shadow-md">
                <CircleArrowLeft />
            </button>

            <div ref={scrollRef} className="flex gap-4 mt-4 overflow-hidden scroll-smooth mx-14">
                {categories && categories.map((category: any) => (
                    <p key={category.name} className="rounded-md bg-sky-300/20 p-2 h-fit min-w-28 text-center whitespace-nowrap cursor-pointer">
                        {category.name}
                    </p>
                ))}
            </div>

            <button onClick={() => scroll("right")} className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-300 p-2 rounded-full shadow-md">
                <CircleArrowRight />
            </button>
        </div>
    )
}

export default Categories