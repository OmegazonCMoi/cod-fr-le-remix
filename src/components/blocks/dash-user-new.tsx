import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface DashUserNewProps {
    onSave: (newUser: { name: string; email: string; roles: string; password: string }) => void;
    onClose: () => void;
}

const DashUserNew: React.FC<DashUserNewProps> = ({ onSave, onClose }) => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        roles: 'Utilisateur',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [id]: value }));
    };

    const handleSave = () => {
        if (user.name && user.email && user.roles && user.password) {
            onSave(user);
        } else {
            alert('Please fill in all the fields.');
        }
    };

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Add New User</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <Input
                            id="name"
                            type="text"
                            value={user.name}
                            onChange={handleChange}
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
                            value={user.email}
                            onChange={handleChange}
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
                            value={user.roles}
                            onChange={handleChange}
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
                            value={user.password}
                            onChange={handleChange}
                            placeholder="Enter user password"
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

export default DashUserNew;
