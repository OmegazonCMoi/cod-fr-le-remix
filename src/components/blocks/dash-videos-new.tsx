import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog'; // Import ShadCN dialog
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

interface DashVideosNewProps {
    onSave: (newVideo: any) => void;
    onClose: () => void;
}

const DashVideosNew: React.FC<DashVideosNewProps> = ({ onSave, onClose }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');

    const handleSave = () => {
        if (title && description && url) {
            const newVideo = { title, description, url };
            onSave(newVideo); // Call the passed-in onSave function to save the new video
        } else {
            alert('Please fill all the fields.');
        }
    };

    return (
        <div>
            <Dialog open onOpenChange={onClose}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold">Add Video</DialogTitle>
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
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-neutral-800 focus:ring focus:ring-indigo-200"
                                placeholder="Enter video title"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="description" className="text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-neutral-800 focus:ring focus:ring-indigo-200"
                                placeholder="Enter video description"
                                rows={3}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="url" className="text-sm font-medium text-gray-700">
                                Video URL
                            </label>
                            <Input
                                id="url"
                                type="text"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-neutral-800 focus:ring focus:ring-indigo-200"
                                placeholder="Enter video URL"
                            />
                        </div>
                    </div>
                    <DialogFooter className="mt-6 space-x-2">
                        <Button onClick={handleSave} variant="default">
                            Save
                        </Button>
                        <Button onClick={onClose} variant="secondary">
                            Cancel
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default DashVideosNew;
