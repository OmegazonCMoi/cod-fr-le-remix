import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../ui/table'; // Ensure the table components are imported

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
            const response = await fetch('https://express-cod-fr.vercel.app/api/reviews');
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
            const response = await fetch(`https://express-cod-fr.vercel.app/api/reviews/${id}`, {
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

    useEffect(() => {
        fetchReviews();
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">Manage Reviews</h2>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            {/* Display Reviews */}
            <div className="overflow-x-auto mt-8 rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Message</TableHead>
                            <TableHead>Note</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {reviews.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                                    No reviews available
                                </TableCell>
                            </TableRow>
                        ) : (
                            reviews.map((review) => (
                                <TableRow key={review.id} className="hover:bg-gray-50">
                                    <TableCell className="py-4 text-sm text-gray-800">{review.user_name}</TableCell>
                                    <TableCell className="py-4 text-sm text-gray-800">{review.message}</TableCell>
                                    <TableCell className="py-4 text-sm text-gray-800">{review.note}</TableCell>
                                    <TableCell className="py-4 text-sm text-gray-800">
                                        {formatDate(review.date_created)}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={() => handleDeleteReview(review.id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default DashReviews;
