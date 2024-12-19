'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import DashEditPost from './dash-forum-edit'; // Modal pour éditer un post
import DashPostNew from './dash-forum-new'; // Modal pour ajouter un nouveau post
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const AdminPanelForum = () => {
    const [posts, setPosts] = useState<any[]>([]); // State pour les posts
    const [loading, setLoading] = useState<boolean>(true); // State de chargement
    const [error, setError] = useState<string>(''); // State d'erreur
    const [editingPostIndex, setEditingPostIndex] = useState<number | null>(null); // Post en édition
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Modal pour "Ajouter un post"

    // Fetch posts depuis l'API
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('https://express-cod-fr.vercel.app/api/forum');
                if (!response.ok) throw new Error('Failed to fetch posts');
                const data = await response.json();
                setPosts(data);
            } catch (err) {
                console.error(err);
                setError('Failed to load posts');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    // Suppression d'un post
    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`https://express-cod-fr.vercel.app/api/forum/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete post');

            // Mise à jour du state
            setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
        } catch (err) {
            console.error(err);
            setError('Failed to delete post');
        }
    };

    // Modification d'un post
    const handleModifyPost = async (updatedPost: any) => {
        try {
            const response = await fetch(`https://express-cod-fr.vercel.app/api/forum/${updatedPost.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedPost),
            });

            if (!response.ok) throw new Error('Failed to update post');

            const data = await response.json();

            // Mise à jour locale
            setPosts((prevPosts) => {
                const index = prevPosts.findIndex((post) => post.id === updatedPost.id);
                if (index === -1) return prevPosts;
                prevPosts[index] = data;
                return [...prevPosts];
            });

            setEditingPostIndex(null);
        } catch (err) {
            console.error(err);
            setError('Failed to update post');
        }
    };

    // Ajout d'un nouveau post
    const handleSaveNewPost = async (newPost: any) => {
        try {
            const response = await fetch('https://express-cod-fr.vercel.app/api/forum', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newPost),
            });
            if (!response.ok) throw new Error('Failed to create post');

            const data = await response.json();
            setPosts((prevPosts) => [...prevPosts, data]);
            setIsModalOpen(false);
        } catch (err) {
            console.error(err);
            setError('Failed to create post');
        }
    };

    if (loading) {
        return <div className="p-6 mt-20">Loading posts...</div>;
    }

    if (error) {
        return <div className="p-6 mt-20 text-red-500">{error}</div>;
    }

    return (
        <div className="p-6">
            <div className="flex items-center gap-4">
                <h2 className="text-3xl font-semibold text-gray-900">Forum Management</h2>
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

            <p className="text-lg text-gray-600 mt-2">Manage and edit forum posts.</p>

            <div className="overflow-x-auto mt-8 rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Content</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {posts.map((post, index) => (
                            <TableRow key={post.id}>
                                <TableCell>{post.id}</TableCell>
                                <TableCell>{post.title}</TableCell>
                                <TableCell>
                                    {post.content.length > 50
                                        ? `${post.content.slice(0, 50)}...`
                                        : post.content}
                                </TableCell>
                                <TableCell>
                                    <div className="space-x-2">
                                        <Button
                                            onClick={() => setEditingPostIndex(index)}
                                            variant="secondary"
                                        >
                                            Edit
                                        </Button>
                                        <Button onClick={() => handleDelete(post.id)}>
                                            Delete
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {editingPostIndex !== null && (
                <DashEditPost
                    forum={posts[editingPostIndex]}
                    onSave={handleModifyPost}
                    onClose={() => setEditingPostIndex(null)}
                />
            )}
            {isModalOpen && (
                <DashPostNew
                    onSave={handleSaveNewPost}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default AdminPanelForum;
