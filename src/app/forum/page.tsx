'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Search } from 'lucide-react';
import Navbar from '@/components/blocks/navbar';
import Footer from '@/components/blocks/footer';
import CommentCreate from '@/components/blocks/comment-create'
import Link from 'next/link';

interface Post {
    id: string;
    title: string;
    content: string;
}

const ForumPage = () => {
    const [mainPosts, setMainPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDiscussions = async () => {
            try {
                const response = await fetch('https://express-cod-fr.vercel.app/api/forum', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des discussions');
                }

                const data: Post[] = await response.json();
                setMainPosts(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Une erreur inconnue est survenue');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchDiscussions();
    }, []);

    const cleanContent = (content: string): string => {
        if (!content) return 'Aucun contenu disponible';
        return content
            .replace(/[*_#@'`]/g, '')
            .slice(0, 100) + '...';
    };

    const recentPosts = [
        { id: '21', title: 'Install All DLCs Black Ops 3' },
        { id: '22', title: 'Unlock All on Black Ops 3' },
        { id: '6', title: "I'm Gonna Rape You XD" },
    ];

    return (
        <>
            <div id="forum" className="min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-grow p-6 justify-center items-center mx-auto">
                    <div className="relative w-[800px] mt-40">
                        <h1 className="text-3xl font-bold text-center mb-10">Hack on COD Forum</h1>
                        <div className="flex items-center space-x-4">
                            <div className="relative flex-grow">
                                <Input placeholder="Rechercher des discussions..." className="w-full pl-4 pr-10" />
                                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                    <Search className="text-gray-400" size={20} />
                                </div>
                            </div>
                            <CommentCreate />
                        </div>
                    </div>
                    <div className="w-[800px]">
                        <div className="flex gap-4">
                            <div className="w-4/7 mt-10">
                                {loading ? (
                                    <p>Chargement...</p>
                                ) : error ? (
                                    <p className="text-red-500">{error}</p>
                                ) : (
                                    mainPosts.map((post) => (
                                        <div
                                            key={post.id}
                                            className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition mb-4"
                                        >
                                            <h3 className="text-lg text-neutral-800 font-bold">{post.title}</h3>
                                            <p className="text-gray-500">{cleanContent(post.content)}</p>
                                            <Link href={`/forum/${post.id}`}>
                                                <Button variant="secondary" className="mt-4">
                                                    Voir plus
                                                </Button>
                                            </Link>
                                        </div>
                                    ))
                                )}
                            </div>
                            <div className="w-3/7">
                                <h2 className="text-2xl font-bold mt-10 mb-4">Posts récents</h2>
                                {recentPosts.map((post) => (
                                    <Link href={`/forum/${post.id}`} key={post.id}>
                                        <div
                                            key={post.id}
                                            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer border mb-4 flex items-center justify-between"
                                        >
                                            <h3 className="text-md text-neutral-800 flex-1">{post.title}</h3>
                                            <ArrowRight className="text-neutral-400 ml-2" size={20} />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ForumPage;
