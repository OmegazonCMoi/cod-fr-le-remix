'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import DashEditUser from './dash-user-edit'; // Edit user modal
import DashUserNew from './dash-user-new'; // New user modal

const AdminPanelUser = () => {
    const [users, setUsers] = useState<any[]>([]); // Users state
    const [loading, setLoading] = useState<boolean>(true); // Loading state
    const [error, setError] = useState<string>(''); // Error state
    const [editingUserIndex, setEditingUserIndex] = useState<number | null>(null); // Index of user being edited
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State for "Add New User" modal

    // Fetch users when component mounts
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:3002/api/users');
                if (!response.ok) throw new Error('Failed to fetch users');
                const data = await response.json();
                setUsers(data);
            } catch (err) {
                console.error(err);
                setError('Failed to load users');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // Handle user deletion
    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:3002/api/users/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete user');

            // Remove the deleted user from the state
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        } catch (err) {
            console.error(err);
            setError('Failed to delete user');
        }
    };

    // Handle updating a user
    const handleModifyUser = async (updatedUser: any) => {
        try {
            // Extract only the fields that need to be updated
            const userPayload = {
                id: updatedUser.id, // Ensure we include the ID
                name: updatedUser.name,
                email: updatedUser.email,
                roles: updatedUser.roles,
            };

            // Make a PUT request to update the user
            const response = await fetch(`http://localhost:3002/api/users/${updatedUser.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userPayload),
            });

            // Check if the response is successful
            if (!response.ok) throw new Error('Failed to update user');

            const data = await response.json();

            // Update the local state to reflect the user changes
            setUsers((prevUsers) => {
                const index = prevUsers.findIndex((user) => user.id === updatedUser.id);
                if (index === -1) return prevUsers; // If user not found, return the same list
                prevUsers[index] = data; // Update the user in the list
                return [...prevUsers];
            });

            // Close the modal after saving
            setEditingUserIndex(null); // This will close the edit modal

        } catch (err) {
            console.error(err);
            setError('Failed to update user');
        }
    };



    // Handle adding a new user
    const handleSaveNewUser = async (newUser: any) => {
        try {
            const response = await fetch('http://localhost:3002/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser),
            });
            if (!response.ok) throw new Error('Failed to create user');

            const data = await response.json();
            setUsers((prevUsers) => [...prevUsers, data]); // Add new user to the list
            setIsModalOpen(false); // Close the modal
        } catch (err) {
            console.error(err);
            setError('Failed to create user');
        }
    };

    if (loading) {
        return <div className="p-6 mt-20">Loading users...</div>;
    }

    if (error) {
        return <div className="p-6 mt-20 text-red-500">{error}</div>;
    }

    return (
        <div className="p-6 mt-20">
            <div className="flex items-center gap-4">
                <h2 className="text-3xl font-semibold text-gray-900">Users Management</h2>
                <Button onClick={() => setIsModalOpen(true)} className="px-8">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-plus"
                    >
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                    </svg>
                </Button>
            </div>

            <p className="text-lg text-gray-600 mt-2">Manage and edit user roles.</p>

            <div className="overflow-x-auto mt-8 rounded-lg">
                <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-white">
                            <th className="py-3 px-6 text-left font-medium text-gray-700">ID</th>
                            <th className="py-3 px-6 text-left font-medium text-gray-700">Name</th>
                            <th className="py-3 px-6 text-left font-medium text-gray-700">Email</th>
                            <th className="py-3 px-6 text-left font-medium text-gray-700">Role</th>
                            <th className="py-3 px-6 text-left font-medium text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user.id} className="border-t border-gray-200 bg-white">
                                <td className="py-4 px-6 text-sm text-gray-800">{user.id}</td>
                                <td className="py-4 px-6 text-sm text-gray-800">{user.name}</td>
                                <td className="py-4 px-6 text-sm text-gray-800">{user.email}</td>
                                <td className="py-4 px-6 text-sm text-gray-800">{user.roles}</td>
                                <td className="py-4 px-6 text-sm text-gray-800 space-x-2">
                                    <Button
                                        onClick={() => setEditingUserIndex(index)}
                                        className=""
                                        variant={'secondary'}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={() => handleDelete(user.id)}
                                        className="text-white"
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {editingUserIndex !== null && (
                <DashEditUser
                    user={users[editingUserIndex]}
                    onSave={handleModifyUser}
                    onClose={() => setEditingUserIndex(null)}
                />
            )}
            {isModalOpen && (
                <DashUserNew onSave={handleSaveNewUser} onClose={() => setIsModalOpen(false)} />
            )}
        </div>
    );
};

export default AdminPanelUser;
