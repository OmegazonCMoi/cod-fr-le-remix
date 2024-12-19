import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface Forum {
    id: number;
    title: string;
    description: string;
    category: string;
}

interface DashForumEditProps {

    forum: Forum;

    onSave: (updatedPost: any) => Promise<void>;

    onClose: () => void;

}


const DashForumEdit: React.FC<DashForumEditProps> = ({ forum, onSave, onClose }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        if (forum) {
            setTitle(forum.title || '');
            setDescription(forum.description || '');
            setCategory(forum.category || '');
        }
    }, [forum]);

    const handleSave = () => {
        if (title && description && category) {
            onSave({ ...forum, title, description, category });
        } else {
            alert('Please fill all the fields.');
        }
    };

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Edit Forum</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="title" className="text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <Input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
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
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
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
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
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

export default DashForumEdit;
