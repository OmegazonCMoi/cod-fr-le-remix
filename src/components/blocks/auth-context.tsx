'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
    id: string;
    name: string;
    email: string;
    roles: string[];
}

interface AuthContextProps {
    isLoggedIn: boolean;
    user: User | null;
    setIsLoggedIn: (value: boolean) => void;
    setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const isConnected = localStorage.getItem('isConnected'); // Check if user is connected

            if (isConnected) {
                const userId = localStorage.getItem('userId'); // Get userId from localStorage

                if (userId && userId !== 'undefined') {
                    // Fetch user details from API
                    fetchUserDetails(userId);
                } else {
                    setIsLoggedIn(false);
                    setUser(null);
                }
            } else {
                setIsLoggedIn(false);
                setUser(null);
            }
        }
    }, []);

    const fetchUserDetails = async (userId: string) => {
        try {
            const response = await fetch(`http://localhost:3002/api/users/${userId}`);
            if (response.ok) {
                const userData: User = await response.json();
                setUser(userData);
                setIsLoggedIn(true);
            } else {
                console.error('Failed to fetch user details');
                setIsLoggedIn(false);
                setUser(null);
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
            setIsLoggedIn(false);
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, setIsLoggedIn, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
