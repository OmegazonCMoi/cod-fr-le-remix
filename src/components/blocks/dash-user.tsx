'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button'; // Assuming you have a Button component

const AdminPanelUser = () => {
    const [users, setUsers] = useState<any[]>([]); // Users state
    const [loading, setLoading] = useState<boolean>(true); // Loading state
    const [error, setError] = useState<string>(''); // Error state

    // Fetch users when component mounts
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:3002/api/users');
                if (!response.ok) throw new Error('Failed to fetch users');
                const data = await response.json();
                setUsers(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load users');
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // Handle user deletion
    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:3002/api/users?id=${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete user');

            // Remove the deleted user from the state
            setUsers(users.filter(user => user.id !== id));
        } catch (err) {
            setError('Failed to delete user');
        }
    };

    if (loading) return <div className="p-6 mt-20">Loading users...</div>;
    if (error) return <div className="p-6 mt-20 text-red-500">{error}</div>;

    return (
        <div className="p-6 mt-20">
            <div className="flex items-center gap-4">
                <h2 className="text-3xl font-semibold text-gray-900">User Management</h2>
                <Button className="px-8">+</Button>
            </div>

            <p className="text-lg text-gray-600 mt-2">Manage and edit user roles.</p>

            {/* Show error message */}
            {error && <p className="text-red-500 mt-4">{error}</p>}

            <div className="overflow-x-auto mt-8 rounded-lg">
                <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-white">
                            <th className="py-3 px-6 text-left font-medium text-gray-700">ID</th>
                            <th className="py-3 px-6 text-left font-medium text-gray-700">Name</th>
                            <th className="py-3 px-6 text-left font-medium text-gray-700">Email</th>
                            <th className="py-3 px-6 text-left font-medium text-gray-700">Role</th>
                            <th className="py-3 px-6 text-left font-medium text-gray-700 w-1/4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="border-t border-gray-200 bg-white">
                                <td className="py-4 px-6 text-sm text-gray-800">{user.id}</td>
                                <td className="py-4 px-6 text-sm text-gray-800">{user.name}</td>
                                <td className="py-4 px-6 text-sm text-gray-800">{user.email}</td>
                                <td className="py-4 px-6 text-sm text-gray-800">{user.roles}</td>
                                <td className="py-4 px-6 text-sm text-gray-800 space-x-2">
                                    <Button className="bg-neutral-700 text-white hover:bg-yellow-600">
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={() => handleDelete(user.id)} // Passing user.id
                                        className="bg-neutral-600 text-white hover:bg-red-600"
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPanelUser;
