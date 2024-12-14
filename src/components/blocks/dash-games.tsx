import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import DashEditGames from './dash-games-edit';
import DashGamesNew from './dash-games-new';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../ui/table'; // Ensure the table components are imported

const AdminPanelGames = () => {
    const [games, setGames] = useState<any[]>([]);
    const [error, setError] = useState<string>('');
    const [editingGameIndex, setEditingGameIndex] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newGameData, setNewGameData] = useState<any | null>(null);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleSaveNewGame = (newGame: any) => {
        setNewGameData(newGame);
        setIsModalOpen(false);
    };

    const handleCreateGame = async (newGame: any) => {
        try {
            const response = await fetch('https://express-cod-fr.vercel.app/api/games', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newGame),
            });

            if (!response.ok) throw new Error('Failed to create game');

            const data = await response.json();
            setGames((prevGames) => [...prevGames, data]);
        } catch {
            setError('Failed to create game');
        }
    };

    const handleModifyGame = async (updatedGame: any) => {
        try {
            const response = await fetch(`https://express-cod-fr.vercel.app/api/games/${updatedGame.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedGame),
            });

            if (!response.ok) throw new Error('Failed to update game');

            const data = await response.json();

            setGames((prevGames) => {
                const index = prevGames.findIndex((game) => game.id === updatedGame.id);
                if (index === -1) return prevGames;
                prevGames[index] = data;
                return [...prevGames];
            });

            setEditingGameIndex(null);
        } catch {
            setError('Failed to update game');
        }
    };

    const handleDelete = async (gameId: number) => {
        try {
            const response = await fetch(`https://express-cod-fr.vercel.app/api/games/${gameId}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete game');

            setGames((prevGames) => prevGames.filter((game) => game.id !== gameId));
        } catch {
            setError('Failed to delete game');
        }
    };

    useEffect(() => {
        if (newGameData) {
            handleCreateGame(newGameData);
            setNewGameData(null);
        }
    }, [newGameData]);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await fetch('https://express-cod-fr.vercel.app/api/games/');
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
        <div className="p-6">
            <div className="flex gap-4">
                <h2 className="text-3xl font-semibold text-gray-900">Games Management</h2>
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

            <p className="text-lg text-gray-600 mt-2">Manage all the games available on the platform.</p>

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
                        {games.map((game) => (
                            <TableRow key={game.id}>
                                <TableCell>{game.title}</TableCell>
                                <TableCell className="truncate max-w-4xl">{game.description}</TableCell>
                                <TableCell>
                                    <div className="space-x-2">
                                        <Button
                                            onClick={() => setEditingGameIndex(games.indexOf(game))}
                                            variant={'secondary'}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            onClick={() => handleDelete(game.id)}
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

            {editingGameIndex !== null && (
                <DashEditGames
                    game={games[editingGameIndex]}
                    onSave={handleModifyGame}
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
