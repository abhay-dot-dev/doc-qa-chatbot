import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react'
import AuthContext from '../context/AuthContext';

const Login = () => {

    const { login } = useContext(AuthContext);

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

            // navigate to home page after a succesful login
            navigate("/")
        } catch (error) {
            if (error.status === 401)
                navigate("/signup")    // redirecting to signup page if login is unsuccessful
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50'>
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h1 className='text-3xl font-semibold text-center mb-6'>DocQA</h1>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <div className="flex flex-col gap-1">
                        <label className='font-medium' htmlFor="email">Email</label>
                        <input
                            className='border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-green-500'
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                            type="email"
                            placeholder='user@example.com'
                            required />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="font-medium" htmlFor="password">Password</label>
                        <input
                            className='border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-green-500'
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                            type="password"
                            placeholder='******'
                            required />
                    </div>

                    <button
                        className='w-full bg-green-500 text-white py-2 rounded-md cursor-pointer hover:bg-green-600 transition-all duration-300 ease-in'
                        type='submit'>Login</button>
                </form>

                <p className='text-center text-sm text-gray-600 mt-1.5'>
                    Don't have an account?{" "}
                    <Link
                        to={"/signup"}
                        className='text-green-500 font-medium hover:text-green-600 transition-colors duration-300'
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div >
    )
}

export default Login