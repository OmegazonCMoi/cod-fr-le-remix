'use client';

import React, { useState } from 'react';
import bcrypt from 'bcryptjs';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Signup = () => {
    // Separate state for form data and plain password
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });
    const [plainPassword, setPlainPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Handle form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === 'password') {
            setPlainPassword(value); // Update plain password
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            // Hash the password client-side
            const hashedPassword = await bcrypt.hash(plainPassword, 10);

            // Prepare data for submission (including the hashed password)
            const submitData = {
                ...formData,
                password: hashedPassword,
            };

            // Submit data to the server
            const response = await fetch('http://localhost:3002/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submitData),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess('Account created successfully!');
                setFormData({ name: '', email: '' });
                setPlainPassword(''); // Reset password field
            } else {
                setError(data.message || 'Something went wrong. Please try again.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <section className="pt-72 justify-center mx-auto flex">
            <div className="container">
                <div className="flex flex-col gap-4">
                    <div className="mx-auto w-full max-w-sm rounded-md p-6 shadow">
                        <div className="mb-6 flex flex-col items-center">
                            <svg
                                width="40"
                                height="40"
                                viewBox="0 0 200 200"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M165.963 134.037C160.496 139.504 151.631 139.504 146.164 134.037L122.027 109.899C116.559 104.432 116.559 95.5678 122.027 90.1005L146.164 65.9631C151.631 60.4957 160.496 60.4957 165.963 65.9631L190.101 90.1004C195.568 95.5678 195.568 104.432 190.101 109.899L165.963 134.037ZM53.8359 134.037C48.3686 139.504 39.5042 139.504 34.0369 134.037L9.89952 109.899C4.43218 104.432 4.43217 95.5678 9.89951 90.1005L34.0369 65.9631C39.5042 60.4957 48.3686 60.4957 53.8359 65.9631L77.9733 90.1004C83.4406 95.5678 83.4406 104.432 77.9733 109.899L53.8359 134.037ZM109.9 190.1C104.432 195.568 95.5679 195.568 90.1005 190.1L65.9631 165.963C60.4958 160.496 60.4958 151.631 65.9631 146.164L90.1005 122.027C95.5679 116.559 104.432 116.559 109.9 122.027L134.037 146.164C139.504 151.631 139.504 160.496 134.037 165.963L109.9 190.1ZM109.9 77.9732C104.432 83.4405 95.5679 83.4406 90.1005 77.9732L65.9631 53.8358C60.4958 48.3685 60.4958 39.5042 65.9631 34.0368L90.1005 9.89946C95.5679 4.43212 104.432 4.43211 109.9 9.89945L134.037 34.0368C139.504 39.5042 139.504 48.3685 134.037 53.8358L109.9 77.9732Z"
                                    fill="url(#paint0_linear_105_379)"
                                />
                                <defs>
                                    <linearGradient
                                        id="paint0_linear_105_379"
                                        x1="154.166"
                                        y1="35.9433"
                                        x2="47.2475"
                                        y2="144.745"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop offset="0.0509862" stopColor="#5A5A5A" />
                                        <stop offset="1" stopColor="#161616" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <p className="mb-2 text-2xl font-bold">Sign up for free!</p>
                            <p className="text-muted-foreground">
                                Sign up in less than 2 minutes.
                            </p>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4">
                                <Input
                                    type="text"
                                    placeholder="Enter your name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                <div>
                                    <Input
                                        type="password"
                                        placeholder="Enter your password"
                                        name="password"
                                        value={plainPassword}
                                        onChange={handleChange}
                                        required
                                        autoComplete="new-password"
                                    />
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Must be at least 8 characters.
                                    </p>
                                </div>
                                <Button type="submit" className="mt-2 w-full">
                                    Create an account
                                </Button>
                            </div>
                        </form>
                        {error && <p className="mt-2 text-red-600">{error}</p>}
                        {success && <p className="mt-2 text-green-600">{success}</p>}
                        <div className="mx-auto mt-8 flex justify-center gap-1 text-sm text-muted-foreground">
                            <p>Already have an account?</p>
                            <a href="login" className="font-medium text-primary">
                                Log in
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Signup;
