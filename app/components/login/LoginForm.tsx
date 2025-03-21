'use client'

import { LoginFormDataPayload } from '@/app/payload/payload';
import Link from 'next/link';
import React, { useState, ChangeEvent, FC } from 'react';

type Props = {
    loginData: LoginFormDataPayload,
    setLoginData: (loginData: LoginFormDataPayload) => void;
    handleSubmit: (e: React.FormEvent)=>void;
}

const LoginForm:FC<Props> = ({loginData, setLoginData, handleSubmit}) => {

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [rememberMe, setRememberMe] = useState<boolean>(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    };

    const handleRememberChange = (e: ChangeEvent<HTMLInputElement>) => {
        setRememberMe(e.target.checked);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">Welcome back</h2>
                    <p className="mt-2 text-sm text-gray-600">Sign in to your account</p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email address
                        </label>
                        <input
                            id="email"
                            name="identifier"
                            type="email"
                            autoComplete="email"
                            required
                            className="relative block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="yourname@example.com"
                            value={loginData.identifier}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type={`${showPassword ? 'text' : 'password'}`}
                            autoComplete="new-password"
                            className="relative block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="••••••••"
                            value={loginData.password}
                            onChange={handleChange}
                        />
                        <div className='flex justify-between'>
                            <p className="mt-1 text-xs text-gray-500">Password must be at least 8 characters long</p>
                            <p className="mt-1 text-xs text-gray-500 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Hide' : 'Show'}</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                checked={rememberMe}
                                onChange={handleRememberChange}
                            />
                            <label htmlFor="remember-me" className="block ml-2 text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                Forgot your password?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative flex w-full justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link href="/sign-up" className="font-medium text-blue-600 hover:text-blue-500">
                            Sign up
                        </Link>
                    </p>
                </div>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-6">
                        <button
                            type="button"
                            className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12.545 10.239v3.821h5.445c-0.222 1.406-1.608 4.119-5.445 4.119-3.282 0-5.958-2.715-5.958-6.059s2.676-6.059 5.958-6.059 1.867 0 3.114 0.797 3.825 1.481l2.609-2.507c-1.676-1.566-3.848-2.517-6.434-2.517-5.297 0-9.6 4.289-9.6 9.6s4.303 9.6 9.6 9.6c5.545 0 9.228-3.899 9.228-9.385 0-0.628-0.069-1.111-0.152-1.595h-9.076z" />
                            </svg>
                            Google
                        </button>
                        <button
                            type="button"
                            className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                            </svg>
                            Facebook
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;