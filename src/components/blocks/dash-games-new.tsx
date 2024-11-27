'use client'

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

// Define the type for the game data
interface GameFormData {
    title: string;
    description: string;
    img: string;
    steam_link: string;
    download_link: string;
    client_link: string;
}

// Define the props for DashGamesNew
interface DashGamesNewProps {
    onSave: (data: GameFormData) => void;
    onClose: () => void;
}

const DashGamesNew: React.FC<DashGamesNewProps> = ({ onSave, onClose }) => {
    const [formData, setFormData] = useState<GameFormData>({
        title: "",
        description: "",
        img: "",
        steam_link: "",
        download_link: "",
        client_link: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = () => {
        console.log("Form Data on Save:", formData); // Check if data is correct
        onSave(formData); // Pass the form data to the parent component
        onClose(); // Close the modal after saving
    };

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Game</DialogTitle>
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
                            name="steam_link"
                            value={formData.steam_link}
                            onChange={handleChange}
                            placeholder="Enter Steam URL"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Download URL</label>
                        <Input
                            type="url"
                            name="download_link"
                            value={formData.download_link}
                            onChange={handleChange}
                            placeholder="Enter Download URL"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Client URL</label>
                        <Input
                            type="url"
                            name="client_link"
                            value={formData.client_link}
                            onChange={handleChange}
                            placeholder="Enter Client URL"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSave} variant="default">
                        Save New Game
                    </Button>
                    <Button onClick={onClose} variant="secondary">
                        Cancel
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DashGamesNew;
