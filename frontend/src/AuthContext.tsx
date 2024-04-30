import React, { createContext, useState, useEffect } from "react";

export type AuthContextType = {
    token: String;
    setToken: React.Dispatch<React.SetStateAction<String>>;
    loading: boolean;
};

var defaultAuthContext = {
    token: '',
    setToken: () => {},
    loading: true,
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<String>('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // TODO: set token on localstorage
        const storedToken = localStorage.getItem('token') ?? '';
        setToken(storedToken);
        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{ token, setToken, loading }}>
            { children }
        </AuthContext.Provider>
    );
};
