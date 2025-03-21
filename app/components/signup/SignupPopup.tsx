import Link from 'next/link'
import React from 'react'

type Props = {}

const SignupPopup = (props: Props) => {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black/10">
            <div className="absolute p-6 rounded-lg shadow-lg h-fit border-black bg-white">
                <p className='text-center'>Signup as</p>
                <div className="flex justify-center">
                    <div className="m-5 bg-blue-200 text-center p-5 rounded-lg h-fit cursor-pointer">
                        <p>Customer</p>
                    </div>
                    <div className="m-5 bg-amber-200 text-center p-5 rounded-lg h-fit cursor-pointer">
                        <p>Seller</p>
                    </div>
                </div>
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link href="/sign-in" className="font-medium text-blue-600 hover:text-blue-500">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignupPopup