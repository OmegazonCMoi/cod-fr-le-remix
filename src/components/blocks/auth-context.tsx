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
            const token = localStorage.getItem('token');

            if (token) {
                // Safely retrieve user data from localStorage
                const storedUser = localStorage.getItem('user');

                if (storedUser && storedUser !== "undefined") {
                    try {
                        const parsedUser = JSON.parse(storedUser);

                        // Check if the parsed user object contains valid data
                        if (parsedUser && parsedUser.id && parsedUser.name) {
                            setUser(parsedUser);
                            setIsLoggedIn(true);
                        } else {
                            setIsLoggedIn(false);
                            setUser(null);
                        }
                    } catch (error) {
                        setIsLoggedIn(false);
                        setUser(null);
                    }
                } else {
                    // If no valid user data in localStorage, fetch from the API
                    fetch('http://localhost:3002/api/users', {
                        headers: { Authorization: `Bearer ${token}` },
                    })
                        .then((res) => {
                            if (!res.ok) {
                                throw new Error(`Failed to fetch user, status: ${res.status}`);
                            }
                            return res.json();
                        })
                        .then((data) => {
                            if (Array.isArray(data) && data.length > 0) {
                                const userData = data[0]; // Get the first user from the array
                                setUser(userData);
                                setIsLoggedIn(true);
                            } else {
                                setIsLoggedIn(false);
                                setUser(null);
                            }
                        })
                        .catch((error) => {
                            setIsLoggedIn(false);
                            setUser(null);
                        });
                }
            } else {
                setIsLoggedIn(false);
                setUser(null);
            }
        }
    }, []);

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

