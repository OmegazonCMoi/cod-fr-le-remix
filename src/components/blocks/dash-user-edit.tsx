import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface User {
    id: number;
    name: string;
    email: string;
    roles: string;
    password?: string; // Optional field for password
}

interface DashUserEditProps {
    user: User;
    onSave: (updatedUser: User) => void;
    onClose: () => void;
}

const DashUserEdit: React.FC<DashUserEditProps> = ({ user, onSave, onClose }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [roles, setRoles] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setEmail(user.email || '');
            setRoles(user.roles || '');
            setPassword(''); // Password should start empty for security
        }
    }, [user]);

    const handleSave = () => {
        if (name && email && roles) {
            onSave({ ...user, name, email, roles, password: password || undefined });
        } else {
            alert('Please fill all the fields.');
        }
    };

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Edit User</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <Input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter user name"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter user email"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="roles" className="text-sm font-medium text-gray-700">
                            Role
                        </label>
                        <Input
                            id="roles"
                            type="text"
                            value={roles}
                            onChange={(e) => setRoles(e.target.value)}
                            placeholder="Enter user role"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter new password (optional)"
                        />
                    </div>
                </div>
                <DialogFooter className="mt-6 space-x-2">
                    <Button onClick={handleSave}>Save</Button>
                    <Button onClick={onClose} variant="secondary">
                        Cancel
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DashUserEdit;
