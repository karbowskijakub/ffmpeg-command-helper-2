import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import url from "@/api/server-connect";

interface AuthContextType {
    isAuthenticated: boolean;
    checkAuth: () => Promise<void>;
    loading: boolean;  
    setIsAuthenticated: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true); 

    const checkAuth = async () => {
        setLoading(true); 
        try {
            const response = await axios.get(`${url}/checkIsLoggedIn`, { withCredentials: true });
            console.log("Auth response:", response.data);
            const isLoggedIn = response.data.success; 
            setIsAuthenticated(isLoggedIn); 
            sessionStorage.setItem("isAuthenticated", response.data.success.toString()); 
        } catch (error) {
            console.error("Error checking authentication:", error);
            setIsAuthenticated(false);
            sessionStorage.removeItem("isAuthenticated");
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        const storedAuth = localStorage.getItem("isAuthenticated");
        if (storedAuth) {
            setIsAuthenticated(JSON.parse(storedAuth));
        }
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, checkAuth, loading, setIsAuthenticated }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
