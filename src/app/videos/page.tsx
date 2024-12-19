'use client';

import { useEffect, useState, useRef } from 'react';
import { animate, spring } from 'motion';
import Navbar from '@/components/blocks/navbar';
import Image from 'next/image';
import Footer from '@/components/blocks/footer';
import { Play } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import Link from 'next/link';

const Videos = () => {
    const [videos, setVideos] = useState<any[]>([]);
    const [error, setError] = useState<string>('');
    const [selectedLinks, setSelectedLinks] = useState<{ [key: string]: string }>({});
    const [showOptions, setShowOptions] = useState<{ [key: string]: boolean }>({});
    const videoRefs = useRef<(HTMLDivElement | null)[]>([]);

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

    const handleSelectChange = (videoId: string, value: string) => {
        const updatedLink =
            value === "1" ? videos.find(v => v.id === videoId)?.link :
                value === "2" ? videos.find(v => v.id === videoId)?.steam :
                    value === "3" ? videos.find(v => v.id === videoId)?.cheats :
                        '';

        setSelectedLinks((prev) => ({
            ...prev,
            [videoId]: updatedLink,
        }));

        setShowOptions((prev) => ({
            ...prev,
            [videoId]: false,
        }));
    };

    const toggleOptions = (videoId: string) => {
        setShowOptions((prev) => {
            const isCurrentlyVisible = prev[videoId];
            return { ...prev, [videoId]: !isCurrentlyVisible };
        });
    };

    return (
        <>
            <div id="videos" className="min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-grow grid place-items-center">
                    <h1 className="my-4 text-pretty text-3xl font-bold sm:text-4xl lg:text-6xl mt-48 mb-20">
                        All videos we&apos;ve posted
                    </h1>

                    {error && <p className="text-red-500 text-xl">{error}</p>}

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-center justify-items-center mb-10">
                        {videos.map((video, idx) => (
                            <Card
                                key={video.id}
                                ref={(el) => { videoRefs.current[idx] = el; }}
                                className="w-[340px] relative"
                            >
                                <CardHeader className="pb-1">
                                    <Play className="size-4" strokeWidth={1} />
                                </CardHeader>
                                <CardContent className="text-left">
                                    <h2
                                        className="mb-1 text-lg font-semibold cursor-pointer hover:text-blue-500 transition-colors"
                                        onClick={() => toggleOptions(video.id)}
                                    >
                                        {video.title}
                                    </h2>
                                    {showOptions[video.id] && (
                                        <div
                                            className="absolute top-12 left-0 w-full bg-white border border-gray-300 shadow-lg rounded-md z-10 p-2"
                                            style={{ opacity: 0 }}
                                            ref={(el) => {
                                                if (el) {
                                                    animate(el, { opacity: [0, 1], scale: [0.9, 1] }, { duration: 0.3 });
                                                }
                                            }}
                                        >
                                            <ul>
                                                <Link href={video.link}>
                                                    <li
                                                        className="p-2 hover:bg-gray-100 cursor-pointer"
                                                        onClick={() => handleSelectChange(video.id, "1")}
                                                    >
                                                        Watch Video
                                                    </li>
                                                </Link>
                                                <Link href={video.steam}>
                                                    <li
                                                        className="p-2 hover:bg-gray-100 cursor-pointer"
                                                        onClick={() => handleSelectChange(video.id, "2")}
                                                    >
                                                        Steam Link
                                                    </li>
                                                </Link>
                                                <Link href={video.cheats}>
                                                    <li
                                                        className="p-2 hover:bg-gray-100 cursor-pointer"
                                                        onClick={() => handleSelectChange(video.id, "3")}
                                                    >
                                                        Get Cheats
                                                    </li>
                                                </Link>
                                            </ul>
                                        </div>
                                    )}
                                    <p className="leading-snug text-muted-foreground">
                                        {video.description}
                                    </p>
                                </CardContent>
                                <CardFooter className="justify-end pb-0 pr-0">
                                    <Image
                                        className="h-40 w-full rounded-tl-md rounded-br-md object-cover object-center"
                                        src={video.img || 'https://www.shadcnblocks.com/images/block/placeholder.svg'}
                                        alt={video.title || 'Video Thumbnail'}
                                        onError={(e) => {
                                            e.currentTarget.src = 'https://www.shadcnblocks.com/images/block/placeholder.svg';
                                        }}
                                        width={300}
                                        height={200}
                                    />
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Videos;
