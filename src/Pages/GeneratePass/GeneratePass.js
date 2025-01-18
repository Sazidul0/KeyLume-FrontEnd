import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GeneratePassword = () => {
    const [length, setLength] = useState(12);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [generatedPassword, setGeneratedPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is logged in by looking for the token in localStorage
        const token = localStorage.getItem('token');

        // If no token is found, the user is not logged in
        if (!token) {
            setError('Session expired. Please log in again.');
            navigate('/login'); // Redirect to login page
        }
    }, [navigate]);

    const handleGeneratePassword = async (e) => {
        e.preventDefault();

        // Validate password length
        if (length < 4 || length > 20) {
            setError('Password length must be between 4 and 20.');
            return;
        }

        // Get token from localStorage
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Session expired. Please log in again.');
            navigate('/login'); // Redirect to login page if no token
            return;
        }

        try {
            const API_URL = process.env.REACT_APP_API_URL || 'https://keylume-backend.onrender.com'; // Use environment variable
            const response = await axios.post(
                `${API_URL}/api/passwords/generate`,
                {
                    length,
                    includeNumbers,
                    includeSymbols,
                    includeUppercase,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                    },
                }
            );

            setGeneratedPassword(response.data.password); // Set the generated password
        } catch (err) {
            setError(err.response?.data?.message || 'Error generating password');
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedPassword);
        alert('Password copied to clipboard!');
    };

    return (
        <div className="flex h-screen justify-center items-center bg-gray-100">
            <div className="card w-96 bg-white shadow-lg p-6">
                <h2 className="text-center text-2xl font-bold mb-4">Generate New Password</h2>
                <form onSubmit={handleGeneratePassword}>
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Password Length</span>
                        </label>
                        <input
                            type="number"
                            value={length}
                            onChange={(e) => setLength(Number(e.target.value))}
                            min="4"
                            max="20"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    <div className="form-control mb-4">
                        <label className="label cursor-pointer">
                            <span className="label-text">Include Numbers</span>
                            <input
                                type="checkbox"
                                checked={includeNumbers}
                                onChange={(e) => setIncludeNumbers(e.target.checked)}
                                className="checkbox"
                            />
                        </label>
                    </div>

                    <div className="form-control mb-4">
                        <label className="label cursor-pointer">
                            <span className="label-text">Include Symbols</span>
                            <input
                                type="checkbox"
                                checked={includeSymbols}
                                onChange={(e) => setIncludeSymbols(e.target.checked)}
                                className="checkbox"
                            />
                        </label>
                    </div>

                    <div className="form-control mb-4">
                        <label className="label cursor-pointer">
                            <span className="label-text">Include Uppercase Letters</span>
                            <input
                                type="checkbox"
                                checked={includeUppercase}
                                onChange={(e) => setIncludeUppercase(e.target.checked)}
                                className="checkbox"
                            />
                        </label>
                    </div>

                    <button type="submit" className="btn w-full bg-blue-500 text-white">
                        Generate Password
                    </button>
                </form>

                {error && <p className="text-red-500 mt-4">{error}</p>}
                {generatedPassword && (
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold">Generated Password:</h3>
                        <p className="bg-gray-200 p-2 rounded">{generatedPassword}</p>
                        <button onClick={handleCopy} className="btn mt-2 bg-green-500 text-white">
                            Copy to Clipboard
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GeneratePassword;
