'use client'

import { getCurrentUser } from '@/pages/api/users/action'
import { getLocalStorage } from '@/app/utils/localStorage'
import { useQuery } from '@tanstack/react-query'
import { Search, ShoppingCart, User, Heart, Menu, X } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

type Props = {}

const Header = (props: Props) => {

    const [username, setUsername] = useState<string>("SAMPLE")
    const [token, setToken] = useState<string>("")
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const accessToken = getLocalStorage('access_token') as string
        setToken(accessToken)
    }, [])

    const { data, isLoading, isError } = useQuery({
        queryKey: ['current-user'],
        queryFn: () => getCurrentUser(token),
    })
    if (isError) return <>Error while fetching current user</>
    if (isLoading) return <>Loading...</>

    return (
        <>
            <nav className="bg-white shadow-md">
                {/* Desktop Navigation */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            {/* Logo */}
                            <div className="flex-shrink-0 flex items-center">
                                <span className="text-2xl font-bold text-indigo-600">Sellon</span>
                            </div>

                            {/* Desktop Menu Items */}
                            <div className="hidden md:ml-6 md:flex md:space-x-8">
                                <Link href="#" className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                    Home
                                </Link>
                                <Link href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                    Products
                                </Link>
                                <Link href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                    Categories
                                </Link>
                                <Link href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                    Deals
                                </Link>
                                <Link href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                    About
                                </Link>
                            </div>
                        </div>

                        {/* Search & User Actions */}
                        <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                            {/* Search Bar */}
                            <div className="relative mx-4">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-4 w-4 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Search products..."
                                />
                            </div>

                            {/* Icons */}
                            <Link href="#" className="text-gray-500 hover:text-gray-900 mx-2">
                                <Heart className="h-6 w-6" />
                            </Link>
                            <Link href="#" className="text-gray-500 hover:text-gray-900 mx-2">
                                <User className="h-6 w-6" />
                            </Link>
                            <Link href="#" className="text-gray-500 hover:text-gray-900 mx-2 relative">
                                <ShoppingCart className="h-6 w-6" />
                                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs">3</span>
                            </Link>
                        </div>

                        {/* Mobile menu button */}
                        <div className="flex items-center md:hidden">
                            <button
                                onClick={toggleMenu}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            >
                                <span className="sr-only">Open main menu</span>
                                {isMenuOpen ? (
                                    <X className="block h-6 w-6" />
                                ) : (
                                    <Menu className="block h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <Link href="#" className="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                                Home
                            </Link>
                            <Link href="#" className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                                Products
                            </Link>
                            <Link href="#" className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                                Categories
                            </Link>
                            <Link href="#" className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                                Deals
                            </Link>
                            <Link href="#" className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                                About
                            </Link>
                        </div>

                        <div className="pt-4 pb-3 border-t border-gray-200">
                            <div className="flex items-center px-4">
                                <div className="ml-3">
                                    <div className="text-base font-medium text-gray-800">My Account</div>
                                </div>
                            </div>
                            <div className="mt-3 space-y-1">
                                <Link href="#" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                                    Profile
                                </Link>
                                <Link href="#" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                                    Wishlist
                                </Link>
                                <Link href="#" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                                    Shopping Cart (3)
                                </Link>
                                <Link href="#" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                                    Orders
                                </Link>
                            </div>
                        </div>

                        {/* Mobile Search */}
                        <div className="pt-2 pb-4 px-4">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-4 w-4 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Search products..."
                                />
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </>
    )
}

export default Header