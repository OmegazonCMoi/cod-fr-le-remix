import React, { useState, useEffect } from "react";
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

interface Video {
    id: number;
    title: string;
    description: string;
    url: string;
}

interface DashEditVideosProps {
    video: Video;
    onSave: (formData: Video) => void;
    onClose: () => void; // Close the modal when save/cancel
}

const DashEditVideos: React.FC<DashEditVideosProps> = ({ video, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        id: video.id,
        title: video.title || "",
        description: video.description || "",
        url: video.url || "",
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
                    <DialogTitle>Edit Video Details</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Title</label>
                        <Input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter video title"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Description</label>
                        <Textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter video description"
                            rows={4}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Video URL</label>
                        <Input
                            type="url"
                            name="url"
                            value={formData.url}
                            onChange={handleChange}
                            placeholder="Enter video URL"
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

export default DashEditVideos;
