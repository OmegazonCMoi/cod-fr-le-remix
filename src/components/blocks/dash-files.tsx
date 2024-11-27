import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';

const DashFiles: React.FC = () => {
    const [files, setFiles] = useState<{ name: string; extension: string; dateAdded: string }[]>([]);
    const [error, setError] = useState<string>('');
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const fetchFiles = async () => {
        try {
            const response = await fetch('http://localhost:3002/api/files');
            if (!response.ok) throw new Error('Failed to fetch files');
            const data = await response.json();
            setFiles(data);
        } catch {
            setError('Failed to load files');
        }
    };

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;

        const formData = new FormData();
        formData.append('file', event.target.files[0]);

        setIsUploading(true);
        try {
            const response = await fetch('http://localhost:3002/api/files/upload', {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) throw new Error('Failed to upload file');
            const data = await response.json();
            console.log('File uploaded:', data.filename);
            fetchFiles();
        } catch {
            setError('Failed to upload file');
        } finally {
            setIsUploading(false);
        }
    };

    const handleDeleteFile = async (filename: string) => {
        try {
            const response = await fetch(`http://localhost:3002/api/files/${filename}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete file');
            fetchFiles();
        } catch {
            setError('Failed to delete file');
        }
    };

    const formatDate = (date: string) => {
        const d = new Date(date);
        return d.toLocaleDateString();
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    return (
        <div className="p-6 mt-20">
            <h2 className="text-3xl font-semibold text-gray-900">Manage Files in Assets</h2>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            <div className="mt-6">
                <input
                    type="file"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                    className="hidden"
                />
                <Button onClick={() => (document.querySelector('input[type="file"]') as HTMLInputElement)?.click()}>
                    {isUploading ? 'Uploading...' : 'Upload New File'}
                </Button>
            </div>

            <div className="overflow-x-auto mt-8 bg-white rounded-lg">
                <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-3 px-6 text-left font-medium text-gray-700">Name</th>
                            <th className="py-3 px-6 text-left font-medium text-gray-700">Extension</th>
                            <th className="py-3 px-6 text-left font-medium text-gray-700">Date Added</th>
                            <th className="py-3 px-6 text-left font-medium text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {files.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="py-4 px-6 text-center text-gray-500">
                                    No files uploaded
                                </td>
                            </tr>
                        ) : (
                            files.map((file) => (
                                <tr key={file.name} className="border-t border-gray-200 bg-white hover:bg-gray-50">
                                    <td className="py-4 px-6 text-sm text-gray-800">{file.name}</td>
                                    <td className="py-4 px-6 text-sm text-gray-800">{file.extension || 'N/A'}</td>
                                    <td className="py-4 px-6 text-sm text-gray-800">{file.dateAdded ? formatDate(file.dateAdded) : 'N/A'}</td>
                                    <td className="py-4 px-6 text-sm text-gray-800 space-x-2">
                                        <Button
                                            onClick={() => handleDeleteFile(file.name)}
                                            className="bg-red-500 text-white hover:bg-red-700"
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DashFiles;
