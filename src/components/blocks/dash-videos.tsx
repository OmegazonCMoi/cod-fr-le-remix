import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import DashEditVideos from './dash-videos-edit'; // Edit modal/form
import DashVideosNew from './dash-videos-new'; // New video modal/form

const AdminPanelVideos: React.FC = () => {
    const [videos, setVideos] = useState<any[]>([]);
    const [error, setError] = useState<string>('');
    const [editingVideoIndex, setEditingVideoIndex] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newVideoData, setNewVideoData] = useState<any | null>(null);

    // Open the "Add New Video" modal
    const handleOpenModal = () => {
        setIsModalOpen(true); // This will trigger the re-render
    };

    // Close the "Add New Video" modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // Save a new video from the modal
    const handleSaveNewVideo = (newVideo: any) => {
        setNewVideoData(newVideo);
        setIsModalOpen(false);
    };

    // Add a new video to the database
    const handleCreateVideo = async (newVideo: any) => {
        try {
            const response = await fetch('http://localhost:3002/api/videos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newVideo),
            });

            if (!response.ok) throw new Error('Failed to create video');

            const data = await response.json();
            setVideos((prevVideos) => [...prevVideos, data]);
        } catch (err) {
            setError('Failed to create video');
        }
    };

    // Delete a video
    const handleDelete = async (videoId: number) => {
        try {
            const response = await fetch(`http://localhost:3002/api/videos/${videoId}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete video');

            setVideos((prevVideos) => prevVideos.filter((video) => video.id !== videoId));
        } catch (err) {
            setError('Failed to delete video');
        }
    };

    // Edit an existing video
    const handleEditVideo = async (updatedVideo: any) => {
        try {
            const response = await fetch(`http://localhost:3002/api/videos/${updatedVideo.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedVideo),
            });

            if (!response.ok) throw new Error('Failed to update video');

            const data = await response.json();

            setVideos((prevVideos) =>
                prevVideos.map((video) => (video.id === data.id ? data : video))
            );

            setEditingVideoIndex(null); // Close the edit form/modal
        } catch (err) {
            setError('Failed to update video');
        }
    };

    // Fetch all videos on component mount
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await fetch('http://localhost:3002/api/videos');
                if (!response.ok) throw new Error('Failed to fetch videos');
                const data = await response.json();
                setVideos(data);
            } catch (err) {
                setError('Failed to load videos');
            }
        };

        fetchVideos();
    }, []);

    // Trigger video creation after modal submission
    useEffect(() => {
        if (newVideoData) {
            console.log('Creating new video:', newVideoData); // Debug log
            handleCreateVideo(newVideoData);
            setNewVideoData(null);
        }
    }, [newVideoData]);

    return (
        <div className="p-6 mt-20">
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

            <div className="overflow-x-auto mt-8 rounded-lg">
                <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-white">
                            <th className="py-3 px-6 text-left font-medium text-gray-700">Title</th>
                            <th className="py-3 px-6 text-left font-medium text-gray-700 w-1/4">Description</th>
                            <th className="py-3 px-6 text-left font-medium text-gray-700 w-1/4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {videos.map((video, index) => (
                            <tr key={video.id} className="border-t border-gray-200 bg-white">
                                <td className="py-4 px-6 text-sm text-gray-800">{video.title}</td>
                                <td className="py-4 px-6 text-sm text-gray-800 truncate max-w-4xl">{video.description}</td>
                                <td className="py-4 px-6 text-sm text-gray-800 space-x-2">
                                    <Button
                                        onClick={() => {
                                            setEditingVideoIndex(index);
                                        }}
                                        className="bg-neutral-700 text-white hover:bg-yellow-600"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={() => handleDelete(video.id)}
                                        className="bg-neutral-600 text-white hover:bg-red-600"
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <DashVideosNew onSave={handleSaveNewVideo} onClose={handleCloseModal} />
            )}
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
