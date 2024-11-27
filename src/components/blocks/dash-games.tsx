import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import DashEditGames from './dash-games-edit';
import DashGamesNew from './dash-games-new';

const AdminPanelGames = () => {
    const [games, setGames] = useState<any[]>([]);
    const [error, setError] = useState<string>('');
    const [editingGameIndex, setEditingGameIndex] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newGameData, setNewGameData] = useState<any | null>(null);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSaveNewGame = (newGame: any) => {
        setNewGameData(newGame); // Save the new game data temporarily in state
        setIsModalOpen(false); // Close the modal after saving
    };

    const handleCreateGame = async (newGame: any) => {
        try {
            const response = await fetch('http://localhost:3002/api/games', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newGame),
            });

            if (!response.ok) throw new Error('Failed to create game');

            const data = await response.json();
            setGames((prevGames) => [...prevGames, data]); // Add the new game to the list
        } catch {
            setError('Failed to create game');
        }
    };

    const handleDelete = async (gameId: number) => {
        try {
            const response = await fetch(`http://localhost:3002/api/games/${gameId}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete game');

            setGames((prevGames) => prevGames.filter((game) => game.id !== gameId));
        } catch {
            setError('Failed to delete game');
        }
    };

    // Effect hook to trigger the game creation side effect (API call) after the component has rendered
    useEffect(() => {
        if (newGameData) {
            handleCreateGame(newGameData); // Create the game after render
            setNewGameData(null); // Reset the newGameData after the request is made
        }
    }, [newGameData]);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await fetch('http://localhost:3002/api/games');
                if (!response.ok) throw new Error('Failed to fetch games');
                const data = await response.json();
                setGames(data);
            } catch {
                setError('Failed to load games');
            }
        };

        fetchGames();
    }, []);

    return (
        <div className="p-6 mt-20">
            <div className='flex gap-4'>
                <h2 className="text-3xl font-semibold text-gray-900">Games Management</h2>
                <Button className='px-8' onClick={handleOpenModal}>
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

            <p className="text-lg text-gray-600 mt-2">Manage all the games available on the platform.</p>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            <div className="overflow-x-auto mt-8 rounded-lg">
                <table className="max-w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-white">
                            <th className="py-3 px-6 text-left font-medium text-gray-700">Title</th>
                            <th className="py-3 px-6 text-left font-medium text-gray-700 w-1/4">Description</th>
                            <th className="py-3 px-6 text-left font-medium text-gray-700 w-1/4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {games.map((game) => (
                            <tr key={game.id} className="border-t border-gray-200 bg-white">
                                <td className="py-4 px-6 text-sm text-gray-800">{game.title}</td>
                                <td className="py-4 px-6 text-sm text-gray-800 truncate max-w-4xl">{game.description}</td>
                                <td className="py-4 px-6 text-sm text-gray-800 space-x-2">
                                    <Button
                                        onClick={() => setEditingGameIndex(games.indexOf(game))}
                                        className="bg-neutral-700 text-white hover:bg-yellow-600"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={() => handleDelete(game.id)} // Passing game.id
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

            {editingGameIndex !== null && (
                <DashEditGames
                    game={games[editingGameIndex]}
                    onSave={handleCreateGame}
                    onClose={() => setEditingGameIndex(null)}
                />
            )}
            {isModalOpen && (
                <DashGamesNew
                    onSave={handleSaveNewGame}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default AdminPanelGames;
