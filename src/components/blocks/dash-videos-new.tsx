import React, { useState } from 'react';
import { Button } from '../ui/button';

interface DashVideosNewProps {
    onSave: (newVideo: any) => void;
    onClose: () => void;
}

const DashVideosNew: React.FC<DashVideosNewProps> = ({ onSave, onClose }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');

    const handleSave = () => {
        if (title && description && url) {
            const newVideo = { title, description, url };
            onSave(newVideo); // Call the passed in onSave function to save the new video
        } else {
            alert('Please fill all the fields.');
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>Add New Video</h3>
                <div className="field">
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        type="text"
                        placeholder="Video Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="field">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        placeholder="Video Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="field">
                    <label htmlFor="url">Video URL</label>
                    <input
                        id="url"
                        type="text"
                        placeholder="Video URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </div>
                <div className="actions">
                    <Button onClick={handleSave}>Save</Button>
                    <Button onClick={onClose}>Cancel</Button>
                </div>
            </div>
        </div>
    );
};

export default DashVideosNew;
