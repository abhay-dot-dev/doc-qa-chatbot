import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Login = () => {

    const {login} = useContext(AuthContext);

    // states for updating email + password
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function handleSubmit(e) {
        // preventing the browser's default behaviour
        e.preventDefault();

        try {
            // passing the email + password to login using the AuthContext
            await login(email, password);

            // navigate to home page after a succesfull login
            navigate("/")
        } catch (error) {
            if (error.status === 401)
                navigate("/signup")    // redirecting to signup page if not sucessfull login
        }
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