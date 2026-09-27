import { useContext } from 'react';
import { Navigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext';

const ProtectedRoute = ({children}) => {

    const {isLoading, isAuthenticated} = useContext(AuthContext);

    if (isLoading) {
        return null;
    }

    if (!isAuthenticated) {
        return <Navigate to={"/login"}/> ;
    }

    return children;
}

export default ProtectedRoute