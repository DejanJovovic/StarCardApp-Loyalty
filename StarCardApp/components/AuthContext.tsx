import React, {createContext, useContext, useState, ReactNode, useEffect, useCallback} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextType {
    auth_token: string | null;
    setAuth: (auth_token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [auth_token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadToken = async () => {
            try {
                const storedToken = await AsyncStorage.getItem("auth_token");
                if (storedToken) setToken(storedToken);
            } catch (error) {
                console.error("Error loading token:", error);
            } finally {
                setLoading(false);
            }
        };

        loadToken();
    }, []);

    const setAuth = useCallback(async (userToken: string) => {
        setToken(userToken);
        await AsyncStorage.setItem("auth_token", userToken);
    }, []);

    const logout = useCallback(async () => {
        setToken(null);
        await AsyncStorage.removeItem("auth_token");
    }, []);

    if (loading) return null; // Prevent rendering before token is loaded

    return (
        <AuthContext.Provider value={{ auth_token, setAuth, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};