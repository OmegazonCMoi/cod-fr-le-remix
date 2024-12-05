import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export const withAdminProtection = <T extends object>(WrappedComponent: React.ComponentType<T>) => {
    const ProtectedComponent = (props: T) => {
        const router = useRouter();
        const [loading, setLoading] = useState(true);
        const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

        useEffect(() => {
            const userData = localStorage.getItem('user'); // Adjust the key to match your localStorage structure
            let token: string | null = null;

            try {
                const parsedData = userData ? JSON.parse(userData) : null;
                token = parsedData?.token || null;
            } catch (error) {
                console.error('Error parsing token from localStorage:', error);
            }

            if (!token) {
                console.warn('No valid token found, redirecting to login.');
                redirectTo('/login');
                return;
            }

            const fetchUserData = async () => {
                try {
                    const response = await fetch('http://localhost:3002/api/users', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });

                    if (!response.ok) {
                        throw new Error(`Failed to fetch user data: ${response.statusText}`);
                    }

                    const data = await response.json();

                    // Since data is an array, we need to access the first element to get the roles
                    const user = data?.[0]; // Get the first user object in the array

                    const roles = user?.roles; // Access roles of the first object in the array

                    if (!roles) {
                        console.warn('No roles found, redirecting to 403.');
                        redirectTo('/403');
                        return;
                    }

                    if (typeof roles === 'string' && roles.trim() === 'Administrateur') {
                        console.log('User has admin privileges');
                        setIsAuthorized(true);
                    } else {
                        console.warn('User does not have admin privileges, redirecting to 403.');
                        redirectTo('/403');
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    redirectTo('/403');
                } finally {
                    setLoading(false);
                }
            };

            fetchUserData();
        }, [router]);

        const redirectTo = (path: string) => {
            router.push(path);
            setIsAuthorized(false);
        };

        if (loading) {
            return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
        }

        if (!isAuthorized) {
            return null;
        }

        return <WrappedComponent {...props} />;
    };

    return ProtectedComponent;
};
