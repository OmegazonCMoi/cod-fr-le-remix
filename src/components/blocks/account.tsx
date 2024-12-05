'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/hooks/auth-context'; // Ensure you're importing from the updated context
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { animate, inView } from 'motion';

const AccountPage: React.FC = () => {
    const { user, setUser, token, logout } = useAuth(); // Use token from context
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        password: '',
    });

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        if (sectionRef.current) {
            inView(
                sectionRef.current,
                () => {
                    animate('.profile-header', { opacity: [0, 1], y: [50, 0] }, { duration: 0.6 });
                    animate('.input-group', { opacity: [0, 1], y: [50, 0] }, { duration: 0.6, delay: 0.2 });
                    animate('.button-group', { opacity: [0, 1], y: [50, 0] }, { duration: 0.6, delay: 0.4 });
                    animate('.logout-button', { opacity: [0, 1], y: [50, 0] }, { duration: 0.6, delay: 0.8 });
                },
                { amount: 0.8 }
            );
        }
    }, []);

    const handleUpdate = async () => {
        setLoading(true);
        setMessage('');

        try {
            if (!user?.id) {
                throw new Error('User ID is required for update');
            }

            const response = await fetch(`http://localhost:3002/api/users/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Use token from the auth context
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                // Update user context with updated data
                setUser({ ...user, name: formData.name, email: formData.email });
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
        logout(); // Using the logout function from context
        router.push('/login'); // Redirect to login page
    };

    return (
        <div className="p-6 mx-auto max-w-2xl" ref={sectionRef}>
            <h1 className="text-2xl font-bold mb-4 mt-20 profile-header opacity-0">Account Details</h1>
            {user ? (
                <div className="space-y-4">
                    <div className="space-y-2 input-group opacity-0">
                        <label htmlFor="name" className="text-sm font-medium">Name</label>
                        <Input
                            id="name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-2 input-group opacity-0">
                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-2 input-group opacity-0">
                        <label htmlFor="password" className="text-sm font-medium">Password</label>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Enter a new password (optional)"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="button-group opacity-0">
                        <Button
                            onClick={handleUpdate}
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? 'Updating...' : 'Update Profile'}
                        </Button>
                    </div>
                    {message && <p className="text-center mt-2 message opacity-0">{message}</p>}
                </div>
            ) : (
                <p>Loading user details...</p>
            )}
            <div className="mt-8">
                <Button
                    onClick={handleLogout}
                    className="w-full bg-red-500 hover:bg-red-600 logout-button opacity-0"
                >
                    Logout
                </Button>
            </div>
        </div>
    );
};

export default AccountPage;
