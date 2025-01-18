import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));


    // Synchronize `isLoggedIn` state with `localStorage`
    useEffect(() => {
        const checkToken = () => {
            const tokenExists = !!localStorage.getItem('token');
            setIsLoggedIn(tokenExists);
        };

        // Listen to changes in localStorage (optional, if token is updated elsewhere)
        const storageListener = () => checkToken();
        window.addEventListener('storage', storageListener);

        // Initial check
        checkToken();

        return () => window.removeEventListener('storage', storageListener);
    }, []);

    const login = () => {
        setIsLoggedIn(true);
    };

    const logout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('token'); // Clear token on logout
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
