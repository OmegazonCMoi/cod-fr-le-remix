import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import DashEditVideos from './dash-videos-edit'; // Edit modal/form
import DashVideosNew from './dash-videos-new'; // New video modal/form
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../ui/table'; // Ensure the table components are imported

const AdminPanelVideos: React.FC = () => {
    const [videos, setVideos] = useState<any[]>([]);
    const [error, setError] = useState<string>('');
    const [editingVideoIndex, setEditingVideoIndex] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newVideoData, setNewVideoData] = useState<any | null>(null);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleCreateVideo = async (newVideo: any) => {
        try {
            const response = await fetch('https://express-cod-fr.vercel.app/api/videos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newVideo),
            });

            if (!response.ok) throw new Error('Failed to create video');

            const data = await response.json();
            setVideos((prevVideos) => [...prevVideos, data]);
            handleCloseModal();
        } catch {
            setError('Failed to create video');
        }
    };

    const handleDelete = async (videoId: number) => {
        try {
            const response = await fetch(`https://express-cod-fr.vercel.app/api/videos/${videoId}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete video');

            setVideos((prevVideos) => prevVideos.filter((video) => video.id !== videoId));
        } catch {
            setError('Failed to delete video');
        }
    };

    const handleEditVideo = async (updatedVideo: any) => {
        try {
            const fieldsToUpdate = { ...updatedVideo };
            delete fieldsToUpdate.created_at;
            delete fieldsToUpdate.updated_at;
            delete fieldsToUpdate.img;

            const response = await fetch(`https://express-cod-fr.vercel.app/api/videos/${updatedVideo.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(fieldsToUpdate),
            });

            if (!response.ok) throw new Error('Failed to update video');

            const data = await response.json();
            setVideos((prevVideos) => {
                const index = prevVideos.findIndex((video) => video.id === updatedVideo.id);
                if (index === -1) return prevVideos;
                prevVideos[index] = data;
                return [...prevVideos];
            });

            setEditingVideoIndex(null);
        } catch {
            setError('Failed to update video');
        }
    };

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await fetch('https://express-cod-fr.vercel.app/api/videos');
                if (!response.ok) throw new Error('Failed to fetch videos');
                const data = await response.json();
                setVideos(data);
            } catch {
                setError('Failed to load videos');
            }
        };

        fetchVideos();
    }, []);

    useEffect(() => {
        if (newVideoData) {
            handleCreateVideo(newVideoData);
            setNewVideoData(null);
        }
    }, [newVideoData]);

    return (
        <div className="p-6">
            <div className="flex mx-auto gap-4">
                <h2 className="text-3xl font-semibold text-gray-900">Videos Management</h2>
                <Button className="px-8" onClick={handleOpenModal}>
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

            <p className="text-lg text-gray-600 mt-2">Manage all the videos available on the platform.</p>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            <div className="overflow-x-auto mt-8 rounded-lg border-gray-200">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {videos.map((video, index) => (
                            <TableRow key={video.id}>
                                <TableCell>{video.title}</TableCell>
                                <TableCell className="truncate max-w-4xl">{video.description}</TableCell>
                                <TableCell>
                                    <div className="space-x-2">
                                        <Button
                                            onClick={() => setEditingVideoIndex(index)}
                                            variant={'secondary'}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            onClick={() => handleDelete(video.id)}
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

            {isModalOpen && <DashVideosNew onSave={handleCreateVideo} onClose={handleCloseModal} />}
            {editingVideoIndex !== null && (
                <DashEditVideos
                    video={videos[editingVideoIndex]}
                    onSave={handleEditVideo}
                    onClose={() => setEditingVideoIndex(null)}
                />
            )}
        </div>
    );
};

export default AdminPanelVideos;
