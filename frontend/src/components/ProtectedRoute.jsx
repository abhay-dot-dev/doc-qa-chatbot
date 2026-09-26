import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { apiRequest } from '../services/api'

const ProtectedRoute = ({children}) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function validateAuthentication() {
            try {
                await apiRequest("/me");
                setIsAuthenticated(true);
            } catch (error) {
                localStorage.removeItem("access_token");
            } finally { 
                setIsLoading(false);
            }
        }
        validateAuthentication();
    }, [])

    if (isLoading) {
        return null;
    }

    if (!isAuthenticated) {
        return <Navigate to={"/login"}/> ;
    }

    return children;
}

export default ProtectedRoute