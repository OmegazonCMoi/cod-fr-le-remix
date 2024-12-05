import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

interface Video {
    title: string;
    description: string;
    link: string;
}

interface DashEditVideosProps {
    video: Video;
    onSave: (video: Video) => void;
    onClose: () => void;
}

const DashEditVideos: React.FC<DashEditVideosProps> = ({ video, onSave, onClose }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');

    useEffect(() => {
        if (video) {
            setTitle(video.title || '');
            setDescription(video.description || '');
            setLink(video.link || '');
        }
    }, [video]);

    const handleSave = () => {
        const updatedVideo = { ...video, title, description, link };
        onSave(updatedVideo);
    };

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent className="max-w-2xl p-8 bg-white rounded-lg shadow-lg">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold text-gray-800">Edit Video</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                    <div className="flex flex-col gap-4">
                        <label htmlFor="title" className="text-sm font-medium text-gray-700">Title</label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter video title"
                        />
                    </div>

                    <div className="flex flex-col gap-4">
                        <label htmlFor="description" className="text-sm font-medium text-gray-700">Description</label>
                        <Textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter video description"
                            rows={4}
                        />
                    </div>

                    <div className="flex flex-col gap-4">
                        <label htmlFor="url" className="text-sm font-medium text-gray-700">Video URL</label>
                        <Input
                            id="url"
                            type="text"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter video URL"
                        />
                    </div>
                </div>

                <DialogFooter className="mt-6 space-x-4">
                    <Button
                        onClick={handleSave}
                        className="text-white rounded-md py-2 px-4"
                    >
                        Save
                    </Button>
                    <Button
                        onClick={onClose}
                        className="bg-gray-300 text-gray-700 hover:bg-gray-400 rounded-md py-2 px-4"
                    >
                        Cancel
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DashEditVideos;
