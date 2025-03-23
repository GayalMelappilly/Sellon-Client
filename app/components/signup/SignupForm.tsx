'use client'

import { FormDataPayload } from '@/app/payload/payload';
import React, { useState, ChangeEvent, FC } from 'react';

type Props = {
    formData: FormDataPayload,
    setFormData: (formData: FormDataPayload) => void,
    handleSubmit: (e: React.FormEvent) => void
}

const SignupForm: FC<Props> = ({ formData, setFormData, handleSubmit }) => {

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [image, setImage] = useState<string>()

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        console.log(e.target.value)
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("CLICKED")
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
            const base64Image = reader.result as string;
            try {
                const response = await fetch('/api/image-upload/upload', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ image: base64Image }),
                });
                console.log("CLOUDINARY ", response)

                const data = await response.json();
                console.log("DATA CLOUD : ",data)
                if (data.url) {
                    console.log("IMAGE URL : ", data.url)
                    setFormData({
                        ...formData,
                        avatar: data.url as string
                    });
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        };
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg my-10">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">Create your account</h2>
                    <p className="mt-2 text-sm text-gray-600">Sign up as a seller</p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                                First Name
                            </label>
                            <input
                                id="first_name"
                                name="first_name"
                                type="text"
                                required
                                className="relative block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder=""
                                value={formData.first_name}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                                Last Name
                            </label>
                            <input
                                id="last_name"
                                name="last_name"
                                type="text"
                                required
                                className="relative block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder=""
                                value={formData.last_name}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="relative block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="yourname@example.com"
                            value={formData.email}
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
                            required
                            minLength={8}
                            className="relative block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <div className='flex justify-between'>
                            <p className="mt-1 text-xs text-gray-500">Password must be at least 8 characters long</p>
                            <p className="mt-1 text-xs text-gray-500 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Hide' : 'Show'}</p>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
                            Phone Number
                        </label>
                        <input
                            id="phone_number"
                            name="phone_number"
                            type="tel"
                            required
                            pattern="[0-9]{10}"
                            className="relative block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="9567564984"
                            value={formData.phone_number}
                            onChange={handleChange}
                        />
                        <p className="mt-1 text-xs text-gray-500">Enter 10-digit phone number</p>
                    </div>

                    <input type="hidden" name="role" value={formData.role} />

                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                            Address
                        </label>
                        <textarea
                            id="address"
                            name="address"
                            required
                            rows={3}
                            className="relative block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Annanad, Thrissur"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
                            Profile Picture
                        </label>
                        <input
                            id="avatar"
                            name="avatar"
                            type="file"
                            className="relative block w-full px-3 py-2 mt-1 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    console.log('File selected:', file);
                                    // setLoading(true)
                                    handleImageUpload(e)
                                }
                            }}
                        />
                        <p className="mt-1 text-xs text-gray-500">Upload a profile picture (optional)</p>
                    </div>

                    <input type="hidden" name="status" value={formData.status} />

                    <div>
                        <button
                            type="submit"
                            className="group relative flex w-full justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Create Account
                        </button>
                    </div>
                </form>

                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <a href="/sign-in" className="font-medium text-blue-600 hover:text-blue-500">
                            Sign in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;