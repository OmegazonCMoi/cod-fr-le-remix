import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog'; // Import ShadCN dialog
import { Button } from '../ui/button';

interface Video {
    title: string;
    description: string;
    url: string;
}

interface DashEditVideosProps {
    video: Video;
    onSave: (video: Video) => void;
    onClose: () => void;
}

const DashEditVideos: React.FC<DashEditVideosProps> = ({ video, onSave, onClose }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');

    useEffect(() => {
        if (video) {
            console.log('Initializing edit form with video:', video); // Debug log
            setTitle(video.title || '');
            setDescription(video.description || '');
            setUrl(video.url || '');
        }
    }, [video]);

    const handleSave = () => {
        const updatedVideo = { ...video, title, description, url };
        console.log('Saving updated video:', updatedVideo); // Debug log
        onSave(updatedVideo);
    };

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Edit Video</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="title" className="text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                            placeholder="Enter video title"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="description" className="text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                            placeholder="Enter video description"
                            rows={3}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="url" className="text-sm font-medium text-gray-700">
                            Video URL
                        </label>
                        <input
                            id="url"
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                            placeholder="Enter video URL"
                        />
                    </div>
                </div>
                <DialogFooter className="mt-6 space-x-2">
                    <Button onClick={handleSave} className="bg-blue-500 text-white hover:bg-blue-600">
                        Save
                    </Button>
                    <Button onClick={onClose} className="bg-gray-300 text-gray-700 hover:bg-gray-400">
                        Cancel
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DashEditVideos;
