'use client';

import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTrigger,
    DialogTitle,
    DialogDescription
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function CreateDiscussionDialog() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [id_user, setIdUser] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false); // État pour contrôler l'ouverture du Dialog

    console.log(id_user);

    const handleCreateDiscussion = async () => {
        if (!title.trim() || !content.trim()) {
            setError('Veuillez remplir tous les champs.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const user = JSON.parse(localStorage.getItem('user') || '{}');

            const userCheck = await fetch(`https://express-cod-fr.vercel.app/api/users/check/${user.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    token: user.token,
                    password: user.password,
                    role: user.roles,
                    userId: user.id,
                }),
            });

            if (!userCheck.ok) {
                throw new Error('Failed to check user');
            } else {
                setIdUser(user.id);
            }

            const response = await fetch('https://express-cod-fr.vercel.app/api/forum', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    content,
                    id_user: user.id,
                }),
            });

            if (!response.ok) {
                throw new Error('Une erreur est survenue lors de la création de la discussion.');
            }

            // Réinitialiser les champs et fermer le modal après succès
            setTitle('');
            setContent('');
            setOpen(false); // Fermer le Dialog
        } catch {
            setError('Une erreur est survenue.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => setOpen(true)}>Créer un post</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Créer une discussion</DialogTitle>
                    <DialogDescription>
                        Remplissez les informations ci-dessous pour ajouter une nouvelle discussion.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    {error && <div className="text-red-500 text-sm">{error}</div>}

                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Titre
                        </label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Titre de la discussion"
                        />
                    </div>

                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                            Contenu
                        </label>
                        <Textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={5}
                            placeholder="Décrivez votre sujet ici..."
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => {
                            setTitle('');
                            setContent('');
                            setError('');
                            setOpen(false); // Fermer le Dialog
                        }}
                    >
                        Annuler
                    </Button>
                    <Button onClick={handleCreateDiscussion} disabled={loading}>
                        {loading ? 'En cours...' : 'Créer'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
