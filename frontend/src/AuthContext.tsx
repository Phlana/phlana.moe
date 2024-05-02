import React, { createContext, useState, useEffect } from "react";

/**
 * context for keeping track of login info
 */

export type AuthContextType = {
    token: string;
    setToken: React.Dispatch<React.SetStateAction<string>>;
    loading: boolean;
    userData: UserDataType;
    setUserData: (data: UserDataType) => void;
};

export type UserDataType = {
    username: string;
    avatar: string;
}

var defaultAuthContext = {
    token: '',
    setToken: () => {},
    loading: true,
    userData: {
        username: '',
        avatar: '',
    },
    setUserData: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [userData, setUserDataState] = useState<UserDataType>({
        username: '',
        avatar: '',
    });

    const setUserData = (data: UserDataType) => {
        setUserDataState(data);
        setLoading(false);
    };

    useEffect(() => {
        // TODO: cookies
        const storedToken = localStorage.getItem('token') ?? '';
        setToken(storedToken);
    }, []);

    return (
        <AuthContext.Provider value={{ token, setToken, loading, userData, setUserData }}>
            { children }
        </AuthContext.Provider>
    );
};
