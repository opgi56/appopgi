import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/invoiceActions';
import logo from '../assets/logo.png';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ username, password }))
            .then(response => {
                if (response.error) {
                    setErrorMessage('Invalid username or password');
                } else {
                    setErrorMessage(''); // Clear error message on successful login
                    // Redirect or perform other actions on successful login
                }
            })
            .catch(() => {
                setErrorMessage('An error occurred. Please try again.');
            });
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-blue-800">
            <div className="absolute inset-0 bg-cover bg-center filter brightness-75 saturation-50" style={{ backgroundImage: 'url(/src/assets/sahara.png)' }}></div>
            <div className="relative z-10 bg-white p-8 rounded-lg shadow-lg max-w-sm w-full space-y-6">
                <div className="flex justify-center">
                    <img src={logo} alt="Logo" className="w-24 h-24 object-cover mb-4" />
                </div>
                <h2 className="text-2xl font-bold text-center text-gray-700">OPGI Djanet</h2>
                {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-300"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
