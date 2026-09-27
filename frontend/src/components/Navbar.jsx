import React, {useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const Navbar = () => {

    const {user, logout} = useContext(AuthContext);
    const navigate = useNavigate();

    function handleLogout() {
        logout();                // removes the access token 
        navigate("/login")       // navigates to login 
    }
    
    return (
        <nav className="h-16 px-6 flex items-center justify-between border-b bg-white">
            <div className="text-xl font-semibold">
                DocQA
            </div>

            <div className="flex items-center gap-4">

                <button className="px-4 py-2 rounded-md bg-green-500 text-white cursor-pointer hover:bg-green-600 transition-all duration-300">
                    + New Chat
                </button>

                <span className="text-sm text-gray-600 bg-green-200 px-4 py-2 rounded-md">
                    {user?.email.split('@')[0]}
                </span>

                <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-md text-red-500 cursor-pointer hover:bg-red-50 transition-colors duration-300"
                >
                    Logout
                </button>
            </div>
        </nav>
    )
}

export default Navbar