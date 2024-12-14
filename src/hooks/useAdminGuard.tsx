import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export const withAdminProtection = <T extends object>(WrappedComponent: React.ComponentType<T>) => {
    const ProtectedComponent = (props: T) => {
        const router = useRouter();
        const [loading, setLoading] = useState(true);
        const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

        useEffect(() => {
            const userData = localStorage.getItem('user');
            let token: string | null = null;
            let userId: string | null = null;
            let role: string | null = null;
            let password: string | null = null;

            try {
                const parsedData = userData ? JSON.parse(userData) : null;
                token = parsedData?.token || null;
                role = parsedData?.roles || null; // Role récupéré depuis localStorage
                userId = parsedData?.id || null;
                password = parsedData?.password || null;
            } catch (error) {
                console.error('Error parsing user data from localStorage:', error);
            }

            if (!token || !userId) {
                console.warn('No valid token or user ID found, redirecting to login.');
                redirectTo('/login');
                return;
            }

            const verifyUser = async () => {
                try {
                    const response = await fetch(`https://express-cod-fr.vercel.app/api/users/verify/${userId}`, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ token, role, password, userId }),
                    });

                    if (!response.ok) {
                        throw new Error(`Failed to verify user: ${response.statusText}`);
                    }

                    const data = await response.json();

                    if (data.message === 'User verified' && role === 'a9$K7,TL4_Tdt+3-?4WU9~n8j/W4rS.KSnca!9:8Kbrf*49zX9') {
                        setIsAuthorized(true);
                    } else {
                        console.warn('User verification failed or insufficient role, redirecting to 403.');
                        redirectTo('/403');
                    }
                } catch (error) {
                    console.error('Error verifying user:', error);
                    redirectTo('/403');
                } finally {
                    setLoading(false);
                }
            };

            verifyUser();
        }, [router]);

        const redirectTo = (path: string) => {
            router.push(path);
            setIsAuthorized(false);
        };

        if (loading) {
            return <div className=' h-screen flex justify-center items-center'>
                <div className="hourglassBackground">
                    <div className="hourglassContainer">
                        <div className="hourglassCurves"></div>
                        <div className="hourglassCapTop"></div>
                        <div className="hourglassGlassTop"></div>
                        <div className="hourglassSand"></div>
                        <div className="hourglassSandStream"></div>
                        <div className="hourglassCapBottom"></div>
                        <div className="hourglassGlass"></div>
                    </div>
                </div>
            </div>;
        }

        if (!isAuthorized) {
            return null;
        }

        return <WrappedComponent {...props} />;
    };

    return ProtectedComponent;
};
