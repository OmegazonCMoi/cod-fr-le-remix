import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Game {
    id: number;
    title: string;
    description: string;
    img: string;
    steam_link: string;
    download_link: string;
    client_link: string;
}

interface DashEditGamesProps {
    game: Game;
    onSave: (formData: Game) => void;
    onClose: () => void; // Close the modal when save/cancel
}

const DashEditGames: React.FC<DashEditGamesProps> = ({ game, onSave, onClose }) => {

    const [formData, setFormData] = useState({
        id: game.id,
        title: game.title || "",
        description: game.description || "",
        img: game.img || "",
        steam_link: game.steam_link || "",
        download_link: game.download_link || "",
        client_link: game.client_link || "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = () => {
        onSave(formData);
    };

    return (
        <Dialog open>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Game Details</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Title</label>
                        <Input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter game title"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Description</label>
                        <Textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter game description"
                            rows={4}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Image URL</label>
                        <Input
                            type="url"
                            name="img"
                            value={formData.img}
                            onChange={handleChange}
                            placeholder="Enter image URL"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Steam URL</label>
                        <Input
                            type="url"
                            name="steam"
                            value={formData.steam_link}
                            onChange={handleChange}
                            placeholder="Enter Steam URL"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Download URL</label>
                        <Input
                            type="url"
                            name="download"
                            value={formData.download_link}
                            onChange={handleChange}
                            placeholder="Enter Download URL"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Client URL</label>
                        <Input
                            type="url"
                            name="client"
                            value={formData.client_link}
                            onChange={handleChange}
                            placeholder="Enter Client URL"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSave} variant="default">
                        Save Changes
                    </Button>
                    <Button onClick={onClose} variant="secondary">
                        Cancel
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DashEditGames;
