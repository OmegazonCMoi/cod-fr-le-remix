'use client'

// logout file

import React, { useEffect } from 'react';
import { useAuth } from '@/hooks/auth-context';

const Logout = () => {
    const { setIsLoggedIn } = useAuth();

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.clear();
        window.location.href = '/';
    };

    useEffect(() => {
        handleLogout();
    }, []);

    return (
        <div>
            <h1>Logging out...</h1>
        </div>
    );
};

export default Logout;