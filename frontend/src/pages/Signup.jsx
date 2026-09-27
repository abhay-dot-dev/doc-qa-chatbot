import { useState } from 'react'
import { signupUser } from '../services/auth';
import { Link, useNavigate } from 'react-router-dom';

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

        // navigating to login page after successful signup
        navigate("/login");
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50'>
            <div className='w-full max-w-md bg-white p-8 rounded-md shadow-md'>
                <h1 className='text-3xl font-semibold text-center mb-6'>Create your account</h1>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <div className="flex flex-col gap-1">
                        <label className='font-medium' htmlFor="email">Email</label>
                        <input
                            className='border border-gray-500 rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-green-500'
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                            type="email"
                            placeholder='user@example.com'
                            required />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className='font-medium' htmlFor="password">Password</label>
                        <input
                            className='border border-gray-500 rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-green-500'
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                            type="password"
                            placeholder='******'
                            required />
                    </div>

                    <button
                        className='w-full bg-green-500 text-white py-2 rounded-md cursor-pointer hover:bg-green-600 transition-all duration-300 ease-in'
                        type='submit'>Signup</button>
                </form>

                <p className='text-center text-sm text-gray-600 mt-1.5'>
                    Already have an account?{" "}
                    <Link
                        to={"/login"}
                        className='text-green-500 font-medium hover:text-green-600 transition-colors duration-300'
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Signup