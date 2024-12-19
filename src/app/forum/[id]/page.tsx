'use client';

import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Navbar from '@/components/blocks/navbar';
import Footer from '@/components/blocks/footer';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

type ForumPostProps = {
    params: Promise<{ id: string }>;
};

type Comment = {
    id: number;
    id_user: string;
    message: string;
    authorName?: string; // Ajoutez ce champ pour stocker le nom de l'auteur
};

export default function ForumPost({ params }: ForumPostProps) {
    const [id, setId] = useState<string>('');
    const [post, setPost] = useState<{ title: string; content: string } | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [error, setError] = useState('');
    const [newComment, setNewComment] = useState('');
    const [creator, setCreator] = useState('');

    async function getPostById(id: string) {
        const response = await fetch(`https://express-cod-fr.vercel.app/api/forum/${id}`, {
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch discussion');
        }

        return response.json();
    }

    async function getUserById(id: string) {
        const response = await fetch(`https://express-cod-fr.vercel.app/api/users/${id}`, {
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user');
        }

        return response.json();
    }

    async function getCommentsByPostId(id: string) {
        const response = await fetch(`https://express-cod-fr.vercel.app/api/forum/comments/${id}`, {
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch comments');
        }

        return response.json();
    }

    async function fetchCommentAuthors(comments: Comment[]) {
        // Récupérez les détails de chaque auteur
        const updatedComments = await Promise.all(
            comments.map(async (comment) => {
                try {
                    const userData = await getUserById(comment.id_user);
                    return { ...comment, authorName: userData.name }; // Ajoutez le nom de l'auteur
                } catch {
                    return { ...comment, authorName: 'Anonymous' }; // Valeur par défaut en cas d'échec
                }
            })
        );

        setComments(updatedComments);
    }

    // Récupère l'ID depuis params
    useEffect(() => {
        async function fetchParams() {
            const resolvedParams = await params;
            setId(resolvedParams.id);

            async function fetchData() {
                try {
                    const postData = await getPostById(resolvedParams.id);
                    const commentsData = await getCommentsByPostId(resolvedParams.id);
                    const creatorData = await getUserById(postData.id_user);

                    setPost(postData);
                    setCreator(creatorData.name);

                    // Récupérez les noms des auteurs pour les commentaires
                    await fetchCommentAuthors(commentsData);
                } catch {
                    setError('Impossible de charger la discussion.');
                }
            }

            fetchData();
        }

        fetchParams();
    }, [params]);

    const handleAddComment = async () => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');

        const userCheck = await fetch(`https://express-cod-fr.vercel.app/api/users/check/${user.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify({
                token: user.token,
                password: user.password,
                role: user.roles,
                userId: user.id,
            }),
        });

        if (!userCheck.ok) {
            throw new Error('Failed to check user');
        } else {
            const newCommentObj = await fetch('https://express-cod-fr.vercel.app/api/forum/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_discussion: id,
                    id_user: user.id,
                    message: newComment,
                }),
            });

            if (!newCommentObj.ok) {
                throw new Error('Failed to add comment');
            }
        }

        if (newComment.trim()) {
            const newCommentObj = {
                id: comments.length + 1,
                id_user: user.id,
                message: newComment,
                authorName: user.name,
            };

            setComments([...comments, newCommentObj]);
            setNewComment('');
        }
    };

    if (error) return <div className="text-red-500 mt-10 text-center">{error}</div>;
    if (!post) return (
        <div className="h-screen flex justify-center items-center">
            <div className="hourglassBackground">
                <div className="hourglassContainer">
                    <div className="hourglassCurves"></div>
                    <div className="hourglassCapTop"></div>
                    <div className="hourglassGlassTop"></div>
                    <div className="hourglassSand"></div>
                    <div className="hourglassSandStream"></div>
                    <div className="hourglassCapBottom"></div>
                    <div className="hourglassGlass"></div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <Navbar />

            {post && (
                <div className="container mx-auto p-6 max-w-4xl pt-10">
                    <div className="bg-white rounded-lg p-6">
                        <p className="mt-40 text-xs text-neutral-500">
                            Discussion created by {creator || 'Anonymous'}
                        </p>
                        <h1 className="text-4xl font-bold mb-4 text-gray-900">{post.title}</h1>

                        <div className="prose mt-4">
                            <ReactMarkdown
                                components={{
                                    p: ({ ...props }) => (
                                        <p className="text-neutral-700 leading-relaxed mb-6" {...props} />
                                    ),
                                    strong: ({ ...props }) => (
                                        <strong className="font-extrabold" {...props} />
                                    ),
                                    em: ({ ...props }) => (
                                        <em className="italic text-neutral-700" {...props} />
                                    ),
                                    h1: ({ ...props }) => (
                                        <h1 className="text-3xl font-bold mt-6 mb-2 text-neutral-900" {...props} />
                                    ),
                                    h2: ({ ...props }) => (
                                        <h2 className="text-2xl font-bold mt-5 mb-2 text-neutral-900" {...props} />
                                    ),
                                    h3: ({ ...props }) => (
                                        <h3 className="text-xl font-bold mt-4 mb-2 text-neutral-900" {...props} />
                                    ),
                                    a: ({ ...props }) => (
                                        <a
                                            className="text-blue-600 hover:underline"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            {...props}
                                        />
                                    ),
                                    ul: ({ ...props }) => (
                                        <ul className="list-disc ml-6 mb-4" {...props} />
                                    ),
                                    ol: ({ ...props }) => (
                                        <ol className="list-decimal ml-6 mb-4" {...props} />
                                    ),
                                    li: ({ ...props }) => (
                                        <li className="mb-2" {...props} />
                                    ),
                                    blockquote: ({ ...props }) => (
                                        <blockquote className="bg-neutral-100 p-4 rounded-lg mt-4 mb-4" {...props} />
                                    ),
                                    code: ({ ...props }) => (
                                        <code className="bg-gray-100 rounded px-1 font-mono text-sm" {...props} />
                                    ),
                                    pre: ({ ...props }) => (
                                        <pre className="bg-neutral-900 text-white p-4 rounded mt-4" {...props} />
                                    ),
                                }}
                            >
                                {post.content}
                            </ReactMarkdown>
                        </div>

                        <div className="border-t pt-6 mt-6">
                            {comments.map((comment) => (
                                <div key={comment.id} className="bg-neutral-100 p-4 rounded-lg border mb-4">
                                    <p className="font-bold">{comment.authorName || 'Anonymous'}</p>
                                    <ReactMarkdown
                                        components={{
                                            p: ({ node, ...props }) => (
                                                <p className="text-neutral-500 leading-relaxed" {...props} />
                                            ),
                                            strong: ({ ...props }) => (
                                                <strong className="font-extrabold" {...props} />
                                            ),
                                            em: ({ ...props }) => (
                                                <em className="italic text-neutral-700" {...props} />
                                            ),
                                            h1: ({ ...props }) => (
                                                <h1 className="text-3xl font-bold mt-6 mb-2 text-neutral-900" {...props} />
                                            ),
                                            h2: ({ ...props }) => (
                                                <h2 className="text-2xl font-bold mt-5 mb-2 text-neutral-900" {...props} />
                                            ),
                                            h3: ({ ...props }) => (
                                                <h3 className="text-xl font-bold mt-4 mb-2 text-neutral-900" {...props} />
                                            ),
                                            a: ({ ...props }) => (
                                                <a
                                                    className="text-blue-600 hover:underline"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    {...props}
                                                />
                                            ),
                                            ul: ({ ...props }) => (
                                                <ul className="list-disc ml-6 mb-4" {...props} />
                                            ),
                                            ol: ({ ...props }) => (
                                                <ol className="list-decimal ml-6 mb-4" {...props} />
                                            ),
                                            li: ({ ...props }) => (
                                                <li className="mb-2" {...props} />
                                            ),
                                            blockquote: ({ ...props }) => (
                                                <blockquote className="bg-neutral-100 p-4 rounded-lg mt-4 mb-4" {...props} />
                                            ),
                                            code: ({ ...props }) => (
                                                <code className="bg-gray-100 rounded px-1 font-mono text-sm" {...props} />
                                            ),
                                            pre: ({ ...props }) => (
                                                <pre className="bg-neutral-900 text-white p-4 rounded mt-4" {...props} />
                                            ),
                                        }}>

                                        {comment.message}</ReactMarkdown>
                                </div>
                            ))}

                            <div>
                                <Textarea
                                    rows={3}
                                    placeholder="Ajoutez votre commentaire..."
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                />
                                <Button onClick={handleAddComment} className="mt-3">
                                    Envoyer
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </>
    );
}
