'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface User {
    id: string;
    name: string;
    email: string;
    roles: string[];
    token: string; // Include token as part of the user data
}

interface AuthContextProps {
    user: User | null;
    setUser: (user: User | null) => void;
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    token: string | null;
    setToken: (token: string | null) => void;
    login: (user: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const synchronizeUserState = useCallback(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            setUser(null);
            setIsLoggedIn(false);
            setToken(null);
            return;
        }

        try {
            const parsedUser = JSON.parse(storedUser) as User;

            // Validate parsed user and its token
            if (parsedUser && parsedUser.token) {
                setUser(parsedUser);
                setIsLoggedIn(true);
                setToken(parsedUser.token);
            } else {
                setUser(null);
                setIsLoggedIn(false);
                setToken(null);
                localStorage.removeItem('user'); // Remove invalid user data
            }
        } catch (error) {
            console.error('Error parsing user from localStorage:', error);
            setUser(null);
            setIsLoggedIn(false);
            setToken(null);
            localStorage.removeItem('user'); // Remove corrupt data
        }
    }, []);

    useEffect(() => {
        synchronizeUserState();
    }, [synchronizeUserState]);

    const login = (newUser: User) => {
        setUser(newUser);
        setIsLoggedIn(true);
        setToken(newUser.token);
        localStorage.setItem('user', JSON.stringify(newUser));
    };

    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);
        setToken(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                isLoggedIn,
                setIsLoggedIn,
                token,
                setToken,
                login,
                logout,
            }}
        >
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
