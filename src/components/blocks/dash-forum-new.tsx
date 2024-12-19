import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface DashForumNewProps {
    onSave: (newForum: { title: string; description: string; category: string }) => void;
    onClose: () => void;
}

const DashForumNew: React.FC<DashForumNewProps> = ({ onSave, onClose }) => {
    const [forum, setForum] = useState({
        title: '',
        description: '',
        category: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setForum((prevForum) => ({ ...prevForum, [id]: value }));
    };

    const handleSave = () => {
        if (forum.title && forum.description && forum.category) {
            onSave(forum);
        } else {
            alert('Please fill in all the fields.');
        }
    };

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Add New Forum</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="title" className="text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <Input
                            id="title"
                            type="text"
                            value={forum.title}
                            onChange={handleChange}
                            placeholder="Enter forum title"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="description" className="text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <Input
                            id="description"
                            type="text"
                            value={forum.description}
                            onChange={handleChange}
                            placeholder="Enter forum description"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="category" className="text-sm font-medium text-gray-700">
                            Category
                        </label>
                        <Input
                            id="category"
                            type="text"
                            value={forum.category}
                            onChange={handleChange}
                            placeholder="Enter forum category"
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

export default DashForumNew;
