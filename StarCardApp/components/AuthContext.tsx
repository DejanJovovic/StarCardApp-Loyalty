import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
    email: string;
    password: string;
    setAuth: (email: string, password: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const setAuth = (userEmail: string, userPassword: string) => {
        setEmail(userEmail);
        setPassword(userPassword);
    };

    return (
        <AuthContext.Provider value={{ email, password, setAuth }}>
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