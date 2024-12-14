'use client';

import { useEffect, useState, useRef } from 'react';
import { animate } from 'motion';
import Navbar from '@/components/blocks/navbar';
import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';
import Footer from '@/components/blocks/footer';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Games = () => {
    const [games, setGames] = useState<any[]>([]);
    const [error, setError] = useState<string>('');
    const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({}); // Individual state for each game
    const gameRefs = useRef<(HTMLDivElement | null)[]>([]); // Reference to game cards

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await fetch('http://express-cod-fr.vercel.app/api/games');
                if (!response.ok) throw new Error('Failed to fetch games');
                const data = await response.json();
                setGames(data);
            } catch {
                setError('Failed to load games');
            }
        };

        fetchGames();
    }, []);

    useEffect(() => {
        // Animate game cards after they are rendered
        if (gameRefs.current.length) {
            gameRefs.current.forEach((game, idx) => {
                if (game) {
                    animate(game, { opacity: [0, 1], y: [50, 0] }, {
                        duration: 0.6,
                        delay: idx * 0.2 // Delay to stagger animations
                    });
                }
            });
        }
    }, [games]);

    const handleLinkSelection = (gameId: string) => {
        const selectedOption = selectedOptions[gameId];
        const game = games.find((game) => game.id === gameId);

        if (game && selectedOption) {
            const link = game[selectedOption]; // Match the selected option key with the game object property
            console.log('Selected Link:', link);

            if (link) {
                window.open(link, '_blank'); // Open the link in a new tab
            } else {
                alert('The selected link is not available for this game.');
            }
        } else {
            alert('Please select an option before proceeding.');
        }
    };

    const handleSelectChange = (gameId: string, value: string) => {
        setSelectedOptions((prev) => ({
            ...prev,
            [gameId]: value,
        }));
    };

    return (
        <>
            <div id="games" className="min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-grow grid place-items-center">
                    <h1 className="my-4 text-pretty text-3xl font-bold sm:text-4xl lg:text-6xl mt-48">
                        All Available Games
                    </h1>

                    {error && <p className="text-red-500 text-xl">{error} Maybe try to reload the page dumbass.</p>}

                    <div className="grid grid-cols-1 gap-8 items-center justify-items-center mb-10">
                        {games.map((game, idx) => (
                            <Card
                                key={game.id}
                                id={game.id}
                                className="w-full md:w-[800px] lg:w-[1100px] h-full flex flex-row items-center"
                                ref={(el) => { gameRefs.current[idx] = el; }} // Set reference to the card
                            >
                                <div className="w-1/3">
                                    <Image
                                        src={game.img || '/images/placeholder.png'}
                                        alt={game.title || 'Game Thumbnail'}
                                        width={200}
                                        height={130}
                                        className="rounded-l-lg"
                                    />
                                </div>

                                {/* Main content area with title and description */}
                                <div className="flex flex-col justify-start items-start w-2/3">
                                    <CardHeader>
                                        <CardTitle>{game.title}</CardTitle>
                                        <CardDescription>{game.description}</CardDescription>
                                    </CardHeader>
                                </div>

                                <CardFooter className="flex flex-col justify-center items-center w-1/3 py-4">
                                    {/* ShadCN Select Dropdown */}
                                    <Select
                                        value={selectedOptions[game.id] || ''} // Individual state for each game
                                        onValueChange={(value) => handleSelectChange(game.id, value)}
                                    >
                                        <SelectTrigger className="mb-4 p-2 border border-gray-300 rounded-md w-[150px]">
                                            <SelectValue placeholder="Select an action" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="download_link">Download Link</SelectItem>
                                            <SelectItem value="steam_link">Steam Link</SelectItem>
                                            <SelectItem value="client_link">Client Link</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    {/* Button */}
                                    <Button
                                        onClick={() => handleLinkSelection(game.id)}
                                        className="w-[150px] mb-2"
                                    >
                                        Go to Link
                                    </Button>
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

export default Games;
