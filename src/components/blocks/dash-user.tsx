'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import DashEditUser from './dash-user-edit'; // Edit user modal
import DashUserNew from './dash-user-new'; // New user modal
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

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
                const response = await fetch('https://express-cod-fr.vercel.app/api/users');
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
            const response = await fetch(`https://express-cod-fr.vercel.app/api/users/${id}`, {
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
            const response = await fetch(`https://express-cod-fr.vercel.app/api/users/${updatedUser.id}`, {
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
            const response = await fetch('https://express-cod-fr.vercel.app/api/users', {
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
        <div className="p-6">
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
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user, index) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    {(() => {
                                        switch (user.roles) {
                                            case 'a9$K7,TL4_Tdt+3-?4WU9~n8j/W4rS.KSnca!9:8Kbrf*49zX9':
                                                return 'Administrateur';
                                            case '93:7!+4heRcikj28iM66T3Q~E9YFja_.?-*,PCNRn2q%^yi92L':
                                                return 'Utilisateur';
                                            case 'x8=VYp-pL4x5E?9GA!:BpYU^F6*b853.t%X+~g2c88zxyg,42F':
                                                return 'VIP';
                                            default:
                                                return 'Rôle inconnu';
                                        }
                                    })()}
                                </TableCell>

                                <TableCell>
                                    <div className="space-x-2">
                                        <Button
                                            onClick={() => setEditingUserIndex(index)}
                                            variant="secondary"
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            onClick={() => handleDelete(user.id)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
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
