import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/auth';

const Login = () => {

    // states for updating email + password
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function handleSubmit(e) {
        // preventing the browser's default behaviour
        e.preventDefault();  

        // passing the email + password to loginUser
        await loginUser(email, password);

        // navigate to home page after a succesfull login
        navigate("/") 
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="user-email">
                    <label htmlFor="email">Email</label>
                    <input
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                        type="email"
                        placeholder='user@example.com'
                        required />
                </div>

                <div className="user-password">
                    <label htmlFor="password">Password</label>
                    <input
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        type="password"
                        placeholder='******'
                        required />
                </div>

                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default Login

// styling is left for login form 