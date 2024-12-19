'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useAuth } from '@/hooks/auth-context';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { animate } from 'motion';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import clsx from 'clsx';

const AccountPage: React.FC = () => {
    const { user, setUser, token, logout } = useAuth();
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        password: '',
    });

    const [formDataReview, setFormDataReview] = useState({
        user_name: '',
        note: 1,
        message: '',
    });

    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState<'success' | 'error' | ''>(''); // For styling messages
    const [loading, setLoading] = useState(false);
    const sectionRef = useRef(null);

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const fetchReviews = useCallback(async () => {
        // Si l'utilisateur n'est pas défini, arrêter immédiatement
        if (!user?.id) {
            console.warn('No user ID provided. Skipping fetchReviews.');
            return;
        }

        try {
            console.log(`Fetching reviews for user ID: ${user.id}`);

            // Effectuer la requête
            const response = await fetch(`https://express-cod-fr.vercel.app/api/reviews/user/${user.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // Vérifiez si la requête a réussi
            if (!response.ok) {
                console.error(`Failed to fetch reviews: ${response.status} - ${response.statusText}`);
                return;
            }

            // Parsez les données JSON de la réponse
            const data = await response.json();
            console.log('Fetched reviews:', data);

            // Si des avis sont trouvés, mettez à jour l'état avec le premier
            if (Array.isArray(data) && data.length > 0) {
                const { user_name, note, message } = data[0]; // On prend le premier avis
                console.log('Review found:', data[0]);
                setFormDataReview({ user_name, note, message });
            } else {
                // Aucun avis trouvé : ne rien faire
                console.info('No reviews found for this user. Nothing to update.');
            }
        } catch (error) {
            // Capturer et logguer les erreurs
            console.error('An error occurred while fetching reviews:', error);
        }
    }, [user, token]);

    useEffect(() => {
        if (sectionRef.current) {
            setTimeout(() => {
                const sequence = [
                    { target: '.profile-header', delay: 0 },
                    { target: '.input-group', delay: 0.2 },
                    { target: '.button-group', delay: 0.4 },
                    { target: '.review-header', delay: 0.6 },
                    { target: '.input-review', delay: 0.8 },
                    { target: '.modify-button', delay: 1 },
                    { target: '.logout-button', delay: 1.2 },
                ];

                sequence.forEach(({ target, delay }) =>
                    animate(target, { opacity: [0, 1], y: [50, 0] }, { duration: 0.6, delay })
                );
            }, 100); // Délai de 100 ms
        }
    }, []);

    useEffect(() => {
        if (user) fetchReviews();
    }, [user, fetchReviews]);

    const handleUpdate = async () => {
        setLoading(true);
        setMessage('');
        setMessageType('');

        try {
            if (!user) {
                setMessage('User not found.');
                setMessageType('error');
                setLoading(false);
                return;
            }

            if (!validateEmail(formData.email)) {
                setMessage('Invalid email address.');
                setMessageType('error');
                setLoading(false);
                return;
            }

            const response = await fetch(`https://express-cod-fr.vercel.app/api/users/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setUser({ ...user, name: formData.name, email: formData.email });
                setMessage('Profile updated successfully!');
                setMessageType('success');
            } else {
                setMessage(data.message || 'Failed to update profile.');
                setMessageType('error');
            }
        } catch {
            setMessage('An error occurred. Please try again.');
            setMessageType('error');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (name: string, value: string, isReview = false) => {
        if (isReview) {
            setFormDataReview((prev) => ({ ...prev, [name]: name === 'note' ? parseInt(value, 10) : value }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formDataReview.user_name || !formDataReview.note || !formDataReview.message) {
            setMessage('Please fill out all fields');
            setMessageType('error');
            return;
        }

        try {
            const response = await fetch(`https://express-cod-fr.vercel.app/api/reviews/${user?.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formDataReview),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to submit review');
            }

            await fetchReviews();

            setMessage('Review submitted successfully!');
            setMessageType('success');
        } catch {
            setMessage('Failed to submit review');
            setMessageType('error');
        }
    };

    return (
        <div className="p-6 mx-auto max-w-2xl" ref={sectionRef}>
            <h1 className="text-2xl font-bold mb-4 mt-20 profile-header opacity-0">Account Details</h1>
            {user ? (
                <div className="space-y-4">
                    <div className="space-y-2 input-group opacity-0">
                        <Label htmlFor="name" className="text-sm font-medium">Name</Label>
                        <Input
                            id="name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                        />
                    </div>
                    <div className="space-y-2 input-group opacity-0">
                        <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                        />
                    </div>
                    <div className="space-y-2 input-group opacity-0">
                        <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Enter a new password (optional)"
                            value={formData.password}
                            onChange={(e) => handleChange(e.target.name, e.target.value)}
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
                </div>
            ) : (
                <p>Loading user details...</p>
            )}

            <h2 className="text-2xl font-semibold mt-10 review-header">Modify your Review</h2>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4 input-review">
                <div className="space-y-1">
                    <Label htmlFor="user_name" className="text-sm font-medium">Your Name</Label>
                    <Input
                        id="user_name"
                        placeholder="Enter your name"
                        value={formDataReview.user_name}
                        onChange={(e) => handleChange('user_name', e.target.value, true)}
                    />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="note" className="text-sm font-medium">Rating</Label>
                    <Select
                        value={formDataReview.note.toString()}
                        onValueChange={(value) => handleChange('note', value, true)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select a rating (1 to 5)" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1">1 - Poor</SelectItem>
                            <SelectItem value="2">2 - Fair</SelectItem>
                            <SelectItem value="3">3 - Good</SelectItem>
                            <SelectItem value="4">4 - Very Good</SelectItem>
                            <SelectItem value="5">5 - Excellent</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-1">
                    <Label htmlFor="message" className="text-sm font-medium">Your Feedback</Label>
                    <Textarea
                        id="message"
                        placeholder="Share your experience..."
                        value={formDataReview.message}
                        onChange={(e) => handleChange('message', e.target.value, true)}
                    />
                </div>
                <Button type="submit" className="w-full modify-button">Modify Review</Button>
            </form>

            <div className="mt-8">
                <Button
                    onClick={handleLogout}
                    className="w-full bg-red-500 hover:bg-red-600 logout-button opacity-0"
                >
                    Logout
                </Button>
                {message && (
                    <div
                        className={clsx(
                            'message-box mt-6 text-center p-2 rounded',
                            messageType === 'success' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                        )}
                    >
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AccountPage;
