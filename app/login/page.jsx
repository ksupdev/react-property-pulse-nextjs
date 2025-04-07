'use client'
import { useSessio,signIn } from "next-auth/react";
import { useState, useRef } from 'react';
// import { useRouter } from 'next/router';

// import { useActionState } from "react";
// import { authenticate } from "@/lib/actions"

const Login = () => {

    const userName = useRef("");
    const pass = useRef("");

    const onSubmit = async () => {
        // console.log('----------'+formData)
        const result = await signIn("credentials", {
            username: userName.current,
            password: pass.current,
            redirect: true,
            callbackUrl: "/",
        });
        console.log(result)
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
                <h1 className="mb-6 text-2xl font-bold text-center">Sign In</h1>
                <form action={onSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-600" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            required
                            autoComplete=""
                            onChange={(e) => (userName.current = e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-600" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            autoComplete=""
                            required
                            onChange={(e) => (pass.current = e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <button
                        className="w-full py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
                    >
                        Sign In
                    </button>
                </form>
                <p className="mt-4 text-sm text-center text-gray-600">
                    {/* Don't have an account? <a href="#" className="text-blue-600 hover:underline">Sign Up</a> */}
                </p>
            </div>
        </div>
    );

};

export default Login
