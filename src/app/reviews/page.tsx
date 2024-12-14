'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Navbar from '@/components/blocks/navbar';
import Footer from '@/components/blocks/footer';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Star } from 'lucide-react';
import { Label } from '@/components/ui/label';

// StarRating Component
const StarRating = ({ rating }: { rating: number }) => {
    return (
        <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, index) => (
                <Star
                    key={index}
                    className={`w-5 h-5 ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}
                    fill={index < rating ? 'currentColor' : 'none'}
                />
            ))}
        </div>
    );
};

const Reviews = () => {
    const [reviews, setReviews] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        user_name: '',
        note: '',
        message: '',
    });
    const controls = useAnimation();
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch('https://express-cod-fr.vercel.app/api/reviews');
                if (!response.ok) throw new Error('Failed to fetch reviews');
                const data = await response.json();
                const sortedReviews = data.sort((a, b) => new Date(b.date_created).getTime() - new Date(a.date_created).getTime());
                setReviews(sortedReviews);
            } catch {
                console.error('Failed to load reviews');
            }
        };

        fetchReviews();
    }, []);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || 'null')
        if (user && user.user_name) {
            setIsUserLoggedIn(true);
            setFormData((prev) => ({ ...prev, user_name: user.user_name }));
        } else {
            setIsUserLoggedIn(false);
        }

        const reviewForm = document.getElementById('review-form');
        const infoText = document.getElementById('review-form-info');

        if (!user && reviewForm && infoText) {
            console.log('User not logged in, applying blur');
            reviewForm.classList.add('blur-xl', 'border');
            infoText.classList.remove('hidden');
        } else if (infoText) {
            console.log('User logged in, removing blur');
            infoText.classList.add('hidden');
            if (reviewForm) {
                reviewForm.classList.remove('blur-xl', 'border'); // Ajoutez cette ligne si nécessaire
            }
        }

        // if (user.user_name) {
        //     setFormData((prev) => ({ ...prev, user_name: user.user_name }));
        // }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    controls.start({
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.8, staggerChildren: 0.2 },
                    });
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, [controls]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.user_name || !formData.note || !formData.message) {
            alert('Please fill out all fields');
            return;
        }

        try {
            const response = await fetch('https://vercel.com/omegazoncmois-projects/express-cod-fr/api/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('Failed to submit review');

            const newReview = await response.json();
            setReviews((prev) => [newReview, ...prev]);
            setFormData({ user_name: '', note: '', message: '' });
        } catch {
            alert('Failed to submit review');
        }
        window.location.reload();
    };

    return (
        <>
            <Navbar />
            <section className="py-48 relative flex justify-center mx-auto">
                <div className="container px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
                        <div className="lg:w-1/2">
                            <h1 className="mb-4 text-4xl font-bold lg:text-5xl">User Reviews</h1>
                            <p className="text-lg text-muted-foreground">
                                Share your thoughts or check out what others have to say about us. Your feedback makes a difference!
                            </p>
                            <p id="review-form-info" className="hidden blur-0 text-red-500 mt-4 font-semibold">
                                You need to sign in or create an account to add a review!
                            </p>
                        </div>
                        <div className="lg:w-1/2 bg-white rounded-lg p-6 lg:p-8" id='review-form'>
                            <h2 className="mb-4 text-2xl font-semibold">Submit Your Review</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-1">
                                    <Label htmlFor="name" className="text-sm font-medium">
                                        Your Name
                                    </Label>
                                    <Input
                                        id="name"
                                        placeholder="Enter your name"
                                        value={formData.user_name || ''}
                                        onChange={(e) => setFormData({ ...formData, user_name: e.target.value })}
                                        disabled={!isUserLoggedIn}
                                    />
                                </div>

                                <div className="space-y-1">
                                    <Label htmlFor="note" className="text-sm font-medium">
                                        Rating
                                    </Label>
                                    <Select
                                        value={formData.note || ''}
                                        onValueChange={(value) => setFormData({ ...formData, note: value })}
                                        disabled={!isUserLoggedIn}
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
                                    <Label htmlFor="message" className="text-sm font-medium">
                                        Your Feedback
                                    </Label>
                                    <Textarea
                                        id="message"
                                        placeholder="Share your experience..."
                                        value={formData.message || ''}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        disabled={!isUserLoggedIn}
                                    />
                                </div>

                                <Button type="submit" className="w-full" disabled={!isUserLoggedIn}>
                                    Submit Review
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 flex relative justify-center mx-auto" ref={sectionRef}>
                <motion.div
                    className="container px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    initial={{ opacity: 0, y: 50 }}
                    animate={controls}
                >
                    {reviews.map((review) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Card className="p-6 bg-white border rounded-lg flex flex-col h-full">
                                <CardHeader>
                                    <div className="flex justify-between items-center">
                                        <CardTitle className="text-lg font-bold">{review.user_name}</CardTitle>
                                        <StarRating rating={parseInt(review.note, 10)} />
                                    </div>
                                    <CardDescription className="text-sm text-gray-500">
                                        {new Date(review.date_created).toLocaleDateString()}
                                    </CardDescription>
                                </CardHeader>
                                <p className="mt-4 text-gray-800 flex-grow">{review.message || 'No message provided.'}</p>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </section>
            <Footer />
        </>
    );
};

export default Reviews;
