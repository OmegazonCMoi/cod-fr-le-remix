'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/auth-context';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface User {
    id: string;
    name: string;
    email: string;
    roles: string[];
}

const AccountPage: React.FC = () => {
    const { user, setUser, setIsLoggedIn } = useAuth();
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        password: '',
    });

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user) {
            router.push('/login'); // Redirect to login if the user is not logged in
        }
    }, [user, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdate = async () => {
        setLoading(true);
        setMessage('');

        try {
            const response = await fetch(`http://localhost:3002/api/users/${user?.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                if (user) {
                    setUser({ ...user, name: formData.name, email: formData.email });
                }
                setMessage('Profile updated successfully!');
            } else {
                setMessage(data.message || 'Failed to update profile.');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        setUser(null);
        router.push('/login'); // Redirect to login page
    };

    return (
        <div className="p-6 mx-auto max-w-2xl">
            <h1 className="text-2xl font-bold mb-4 mt-20">Account Details</h1>
            {user ? (
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                            Name
                        </label>
                        <Input
                            id="name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                            Email
                        </label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium">
                            Password
                        </label>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Enter a new password (optional)"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <Button
                        onClick={handleUpdate}
                        className="w-full"
                        disabled={loading}
                    >
                        {loading ? 'Updating...' : 'Update Profile'}
                    </Button>
                    {message && <p className="text-center mt-2">{message}</p>}
                </div>
            ) : (
                <p>Loading user details...</p>
            )}
            <div className="mt-8">
                <Button onClick={handleLogout} className="w-full bg-red-500 hover:bg-red-600">
                    Logout
                </Button>
            </div>
        </div>
    );
};

export default AccountPage;
