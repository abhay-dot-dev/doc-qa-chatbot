import { useState } from 'react'
import { signupUser } from '../services/auth';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    // states for updating email + password
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function handleSubmit(e) {
        // preventing the browser's default behaviour
        e.preventDefault();

        // passing the email + password to signupUser
        await signupUser(email, password);

        // navigating to login page after successfull signup
        navigate("/login");
    }

    return (
        <div>
            <h1>Signup</h1>
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

                <button type='submit'>Signup</button>
            </form>
        </div>
    )
}

export default Signup