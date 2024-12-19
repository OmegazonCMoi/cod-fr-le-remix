import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '../ui/button';

const DashFiles: React.FC = () => {
    const [files, setFiles] = useState<{ name: string; extension: string; dateAdded: string }[]>([]);
    const [error, setError] = useState<string>('');
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const fetchFiles = async () => {
        try {
            const response = await fetch('https://express-cod-fr.vercel.app/api/files');
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
            const response = await fetch('https://express-cod-fr.vercel.app/api/files/upload', {
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
            const response = await fetch(`https://express-cod-fr.vercel.app/api/files/${filename}`, {
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
        <div className="p-6">
            <h2 className="text-3xl font-semibold text-gray-900">Manage Files in Assets</h2>
            <p className='text-red-500'>Not available. Work in progess...</p>

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

            <div className="overflow-x-auto mt-8">
                <Table className="min-w-full rounded-lg">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="py-3 px-6 text-left font-medium text-gray-700">Name</TableHead>
                            <TableHead className="py-3 px-6 text-left font-medium text-gray-700">Extension</TableHead>
                            <TableHead className="py-3 px-6 text-left font-medium text-gray-700">Date Added</TableHead>
                            <TableHead className="py-3 px-6 text-left font-medium text-gray-700">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {files.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="py-4 px-6 text-center text-gray-500">
                                    No files uploaded
                                </TableCell>
                            </TableRow>
                        ) : (
                            files.map((file) => (
                                <TableRow key={file.name} className="border-t border-gray-200 bg-white hover:bg-gray-50">
                                    <TableCell className="py-4 px-6 text-sm text-gray-800">{file.name}</TableCell>
                                    <TableCell className="py-4 px-6 text-sm text-gray-800">
                                        {file.extension || "N/A"}
                                    </TableCell>
                                    <TableCell className="py-4 px-6 text-sm text-gray-800">
                                        {file.dateAdded ? formatDate(file.dateAdded) : "N/A"}
                                    </TableCell>
                                    <TableCell className="py-4 px-6 text-sm text-gray-800 space-x-2">
                                        <Button
                                            onClick={() => handleDeleteFile(file.name)}
                                            className="bg-red-500 text-white hover:bg-red-700"
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default DashFiles;
