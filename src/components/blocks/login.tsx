'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/auth-context';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const { setIsLoggedIn, setUser } = useAuth();
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validation
        if (!formData.email || !formData.password) {
            setError('Both email and password are required.');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setError('Please enter a valid email address.');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('https://express-cod-fr.vercel.app/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (response.ok) {
                setSuccess('Login successful!');
                setIsLoggedIn(true);

                // Check if the token is available in the response (within `data.user.token`)
                if (data.user && data.user.token) {
                    // Store the token in localStorage
                    localStorage.setItem('user', JSON.stringify(data.user));

                    // Store the user info (optional but useful for session management)
                    setUser(data.user); // Assuming data.user contains the user details

                    // Redirect to dashboard
                    router.push('/');
                } else {
                    setError('Login succeeded, but no token was returned.');
                }
            } else {
                setError(data.message || 'Invalid credentials.');
            }
        } catch (err) {
            console.error('Error:', err); // Log any unexpected errors
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <section className="py-32 justify-center mx-auto flex">
            <div className="container">
                <div className="flex flex-col gap-4">
                    <div className="relative flex flex-col items-center overflow-hidden pb-2 pt-32">
                        <svg width="40" height="40" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="..." fill="url(#paint0_linear_105_379)" />
                            <defs>
                                <linearGradient id="paint0_linear_105_379" x1="..." y1="..." x2="..." y2="...">
                                    <stop offset="0.05" stopColor="#5A5A5A" />
                                    <stop offset="1" stopColor="#161616" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <p className="text-2xl font-bold">Login</p>
                    </div>
                    <div className="z-10 mx-auto w-full max-w-sm rounded-md bg-background px-6 py-12 shadow">
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4">
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <div className="grid w-full max-w-sm items-center gap-1.5">
                                        <label htmlFor="password" className="text-sm font-medium">Password</label>
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="Enter your password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                            autoComplete="current-password"
                                        />
                                    </div>
                                </div>
                                <Button type="submit" className="mt-2 w-full" disabled={loading}>
                                    {loading ? 'Logging in...' : 'Login'}
                                </Button>
                            </div>
                        </form>
                        {error && <p className="mt-2 text-red-600">{error}</p>}
                        {success && <p className="mt-2 text-green-600">{success}</p>}
                    </div>
                </div>
                <div className="mx-auto mt-3 flex justify-center gap-1 text-sm text-muted-foreground">
                    <p>Don&apos;t have an account?</p>
                    <a href="/register" className="font-medium text-primary">
                        Sign up
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Login;
