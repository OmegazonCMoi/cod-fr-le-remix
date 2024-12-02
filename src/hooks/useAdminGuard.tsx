import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export const withAdminProtection = <T extends object>(WrappedComponent: React.ComponentType<T>) => {
    const ProtectedComponent = (props: T) => {
        const router = useRouter();
        const [loading, setLoading] = useState(true);
        const [userRole, setUserRole] = useState<string | null>(null);

        useEffect(() => {
            // Get userId from localStorage
            const userId = localStorage.getItem('userId');

            if (userId) {
                // Fetch the user data by userId
                fetch(`http://localhost:3002/api/users/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data && data.roles === 'Administrateur') {
                            setUserRole('Administrateur');
                            setLoading(false);
                        } else {
                            router.push('/403'); // Redirect to a 403 page if not admin
                        }
                    })
                    .catch(() => {
                        router.push('/403'); // Redirect to 403 if user data cannot be fetched
                    });
            } else {
                router.push('/login'); // If no userId found in localStorage, redirect to login
            }
        }, [router]);

        if (loading) {
            return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
        }

        // Render the protected page after the loading state is set to false
        return <WrappedComponent {...props} />;
    };

    return ProtectedComponent;
};
