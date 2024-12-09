'use client';

import { useEffect, useState, useRef } from 'react';
import { animate } from 'motion';
import Navbar from '@/components/blocks/navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/blocks/footer';

const Videos = () => {
    const [videos, setVideos] = useState<any[]>([]);
    const [error, setError] = useState<string>('');
    const [selectedLinks, setSelectedLinks] = useState<{ [key: string]: string }>({});
    const videoRefs = useRef<(HTMLDivElement | null)[]>([]); // Reference to video cards

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await fetch('http://localhost:3002/api/videos');
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
        // Animate video cards after they are rendered
        if (videoRefs.current.length) {
            videoRefs.current.forEach((video, idx) => {
                if (video) {
                    animate(video, { opacity: [0, 1], y: [50, 0] }, {
                        duration: 0.6,
                        delay: idx * 0.2 // Delay to stagger animations
                    });
                }
            });
        }
    }, [videos]); // Trigger animation after videos are loaded

    const handleSelectChange = (videoId: string, value: string) => {
        const updatedLink =
            value === "1" ? videos.find(v => v.id === videoId)?.link :
                value === "2" ? videos.find(v => v.id === videoId)?.steam :
                    value === "3" ? videos.find(v => v.id === videoId)?.cheats :
                        '';

        setSelectedLinks((prev) => ({
            ...prev,
            [videoId]: updatedLink, // Set the selected link for the video
        }));
    };

    return (
        <>
            <div id="videos" className="min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-grow grid place-items-center">
                    <h1 className="my-4 text-pretty text-3xl font-bold sm:text-4xl lg:text-6xl mt-48">
                        All videos we&apos;ve posted
                    </h1>

                    {error && <p className="text-red-500 text-xl">{error}</p>}

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-center justify-items-center mb-10">
                        {videos.map((video, idx) => (
                            <Card
                                key={video.id}
                                className="w-[350px] h-full"
                                ref={(el) => { videoRefs.current[idx] = el; }} // Set reference to the card
                            >
                                <CardHeader>
                                    <CardTitle>{video.title}</CardTitle>
                                    <CardDescription>{video.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid w-full items-center gap-4">
                                        <div className="flex flex-col space-y-1.5">
                                            <Image
                                                src={video.img || '/images/placeholder.png'}
                                                alt={video.title || 'Video Thumbnail'}
                                                width={300}
                                                height={200}
                                                className="rounded-lg"
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex gap-4 justify-end">
                                    <Select onValueChange={(value) => handleSelectChange(video.id, value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select an action" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">Watch Video</SelectItem>
                                            <SelectItem value="2">Steam Link</SelectItem>
                                            <SelectItem value="3">Get Cheats</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Link href={selectedLinks[video.id] || '#'} passHref>
                                        <Button>
                                            Go to Link
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
                                                className="lucide lucide-move-right"
                                            >
                                                <path d="M18 8L22 12L18 16" />
                                                <path d="M2 12H22" />
                                            </svg>
                                        </Button>
                                    </Link>
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
