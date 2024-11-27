import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from './auth-context';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { setIsLoggedIn } = useAuth();

    // Handle form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Simple client-side validation
        if (!formData.email || !formData.password) {
            setError('Please fill in both fields');
            return;
        }

        try {
            // Submit login request to the server
            const response = await fetch('https://express-cod-fr.vercel.app/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess('Login successful!');
                setIsLoggedIn(true);
                localStorage.setItem('token', data.token);
            } else {
                setError(data.message || 'Invalid credentials');
            }
        } catch {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <section className="py-32 justify-center mx-auto flex">
            <div className="container">
                <div className="flex flex-col gap-4">
                    <div className="relative flex flex-col items-center overflow-hidden pb-2 pt-32">
                        <svg width="40" height="40" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M165.963 134.037C160.496 139.504 151.631 139.504 146.164 134.037L122.027 109.899C116.559 104.432 116.559 95.5678 122.027 90.1005L146.164 65.9631C151.631 60.4957 160.496 60.4957 165.963 65.9631L190.101 90.1004C195.568 95.5678 195.568 104.432 190.101 109.899L165.963 134.037ZM53.8359 134.037C48.3686 139.504 39.5042 139.504 34.0369 134.037L9.89952 109.899C4.43218 104.432 4.43217 95.5678 9.89951 90.1005L34.0369 65.9631C39.5042 60.4957 48.3686 60.4957 53.8359 65.9631L77.9733 90.1004C83.4406 95.5678 83.4406 104.432 77.9733 109.899L53.8359 134.037ZM109.9 190.1C104.432 195.568 95.5679 195.568 90.1005 190.1L65.9631 165.963C60.4958 160.496 60.4958 151.631 65.9631 146.164L90.1005 122.027C95.5679 116.559 104.432 116.559 109.9 122.027L134.037 146.164C139.504 151.631 139.504 160.496 134.037 165.963L109.9 190.1ZM109.9 77.9732C104.432 83.4405 95.5679 83.4406 90.1005 77.9732L65.9631 53.8358C60.4958 48.3685 60.4958 39.5042 65.9631 34.0368L90.1005 9.89946C95.5679 4.43212 104.432 4.43211 109.9 9.89945L134.037 34.0368C139.504 39.5042 139.504 48.3685 134.037 53.8358L109.9 77.9732Z"
                                fill="url(#paint0_linear_105_379)"
                            />
                            <defs>
                                <linearGradient id="paint0_linear_105_379" x1="154.166" y1="35.9433" x2="47.2475" y2="144.745" gradientUnits="userSpaceOnUse">
                                    <stop offset="0.0509862" stopColor="#5A5A5A" />
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
                                    <label htmlFor="email">Email</label>
                                    <Input
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
                                        <label htmlFor="password">Password</label>
                                        <Input
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
                                <Button type="submit" className="mt-2 w-full">
                                    Login
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
