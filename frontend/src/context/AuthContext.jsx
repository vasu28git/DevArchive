import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(
        localStorage.getItem('userEmail') ? { email: localStorage.getItem('userEmail') } : null
    );

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    useEffect(() => {
        if (user?.email) {
            localStorage.setItem('userEmail', user.email);
        } else {
            localStorage.removeItem('userEmail');
        }
    }, [user]);

    const login = (newToken, email) => {
        setToken(newToken);
        setUser({ email });
    };

    const logout = () => {
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated: !!token }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
