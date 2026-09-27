import { createContext, useState, useEffect } from "react";
import { apiRequest } from '../services/api'
import { loginUser, logoutUser } from "../services/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function validateAuthentication() {
            try {
                const response = await apiRequest("/me");
                setUser(response);
                setIsAuthenticated(true);
            } catch (error) {
                localStorage.removeItem("access_token");
            } finally {
                setIsLoading(false);
            }
        }
        validateAuthentication();
    }, [])

    async function login(email, password) {
        await loginUser(email, password);

        const response = await apiRequest("/me");

        setUser(response);
        setIsAuthenticated(true);
    }

    function logout() {
        logoutUser();
        setUser(null);
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            isLoading,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;