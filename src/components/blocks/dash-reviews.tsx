import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';

interface Review {
    id: number;
    user_name: string;
    message: string;
    note: number;
    date_created: string;
}

const DashReviews: React.FC = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [error, setError] = useState<string>('');

    // Fetch reviews from the server
    const fetchReviews = async () => {
        try {
            const response = await fetch('http://localhost:3002/api/reviews');
            if (!response.ok) throw new Error('Failed to fetch reviews');
            const data = await response.json();
            setReviews(data);
        } catch {
            setError('Failed to load reviews');
        }
    };

    // Delete a review
    const handleDeleteReview = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:3002/api/reviews/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete review');
            fetchReviews(); // Refresh the reviews list
        } catch {
            setError('Failed to delete review');
        }
    };

    // Format the date
    const formatDate = (date: string) => {
        const d = new Date(date);
        return d.toLocaleDateString();
    };

    // Fetch reviews on component mount
    useEffect(() => {
        fetchReviews();
    }, []);

    return (
        <div className="p-6 mt-20">
            <h2 className="text-3xl font-semibold text-gray-900">Manage Reviews</h2>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            {/* Display Reviews */}
            <div className="overflow-x-auto mt-8 bg-white rounded-lg">
                <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
                    <thead>
                        <tr className="bg-white">
                            <th className="py-3 px-6 text-left font-medium text-gray-700">User</th>
                            <th className="py-3 px-6 text-left font-medium text-gray-700">Message</th>
                            <th className="py-3 px-6 text-left font-medium text-gray-700">Note</th>
                            <th className="py-3 px-6 text-left font-medium text-gray-700">Date</th>
                            <th className="py-3 px-6 text-left font-medium text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="py-4 px-6 text-center text-gray-500">
                                    No reviews available
                                </td>
                            </tr>
                        ) : (
                            reviews.map((review) => (
                                <tr key={review.id} className="border-t border-gray-200 bg-white hover:bg-gray-50">
                                    <td className="py-4 px-6 text-sm text-gray-800">{review.user_name}</td>
                                    <td className="py-4 px-6 text-sm text-gray-800">{review.message}</td>
                                    <td className="py-4 px-6 text-sm text-gray-800">{review.note}</td>
                                    <td className="py-4 px-6 text-sm text-gray-800">{formatDate(review.date_created)}</td>
                                    <td className="py-4 px-6 text-sm text-gray-800">
                                        <Button
                                            onClick={() => handleDeleteReview(review.id)}
                                            className="bg-red-500 text-white hover:bg-red-700"
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DashReviews;
