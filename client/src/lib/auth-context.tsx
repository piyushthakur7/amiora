import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
    wpLogin,
    wpRegister,
    wpLogout,
    getStoredUser,
    getStoredToken,
    validateToken,
    type WPUser,
    type AuthResponse,
} from "./wp-auth";

interface User {
    id: number;
    name: string;
    email: string;
    firstName?: string;
    lastName?: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<AuthResponse>;
    register: (email: string, password: string, firstName: string, lastName: string) => Promise<AuthResponse>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function mapWPUserToUser(wpUser: WPUser): User {
    return {
        id: wpUser.id,
        name: wpUser.displayName || `${wpUser.firstName} ${wpUser.lastName}`.trim() || wpUser.username,
        email: wpUser.email,
        firstName: wpUser.firstName,
        lastName: wpUser.lastName,
    };
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check for existing session on mount
    useEffect(() => {
        const initAuth = async () => {
            const storedUser = getStoredUser();
            const token = getStoredToken();

            if (storedUser && token) {
                // Validate token with server
                const isValid = await validateToken();
                if (isValid) {
                    setUser(mapWPUserToUser(storedUser));
                } else {
                    // Token expired, clear data
                    wpLogout();
                }
            }
            setIsLoading(false);
        };

        initAuth();
    }, []);

    const login = async (email: string, password: string): Promise<AuthResponse> => {
        const result = await wpLogin(email, password);
        if (result.success && result.user) {
            setUser(mapWPUserToUser(result.user));
        }
        return result;
    };

    const register = async (
        email: string,
        password: string,
        firstName: string,
        lastName: string
    ): Promise<AuthResponse> => {
        const result = await wpRegister(email, password, firstName, lastName);
        if (result.success && result.user) {
            setUser(mapWPUserToUser(result.user));
        }
        return result;
    };

    const logout = () => {
        wpLogout();
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
