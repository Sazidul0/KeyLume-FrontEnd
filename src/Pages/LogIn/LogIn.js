import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha'; // Import ReCAPTCHA
import { useAuth } from '../Shared/AuthContext'; // Import the AuthContext
import { ClipLoader } from 'react-spinners'; // Import the spinner from react-spinners

const LogIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [captcha, setCaptcha] = useState(null); // Store CAPTCHA response
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Loading state
    const navigate = useNavigate();
    const { login } = useAuth(); // Use the AuthContext

    const handleCaptchaChange = (value) => {
        setCaptcha(value); // Set CAPTCHA response value
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!captcha) {
            setError('Please complete the CAPTCHA');
            return;
        }

        setLoading(true); // Set loading to true when the login process starts
        setError(''); // Clear any previous errors

        try {
            const response = await axios.post('https://keylume-backend.onrender.com/api/users/login', {
                email,
                password,
                captcha, // Send CAPTCHA response
            });

            // Store the token in localStorage
            localStorage.setItem('token', response.data.token);
            login(); // Call login from context
            navigate('/managePass'); // Redirect to dashboard after successful login
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid email or password');
        } finally {
            setLoading(false); // Set loading to false after the request is completed
        }
    };

    return (
        <div className="flex h-screen justify-center items-center bg-gray-100">
            <div className="card w-96 bg-white shadow-lg p-6">
                <h2 className="text-center text-2xl font-bold mb-4">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-control w-full mb-4">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Your Email"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    <div className="form-control w-full mb-4">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Your Password"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    {/* CAPTCHA Integration */}
                    <div className="form-control w-full mb-4">
                        <ReCAPTCHA
                            sitekey="6LcTNLcqAAAAAOMFu1A9LsaS2cAxNgLoYByWQfK6" // Replace with your reCAPTCHA site key
                            onChange={handleCaptchaChange}
                        />
                    </div>

                    {error && <p className="text-red-500 mb-4">{error}</p>}

                    {/* Show the spinner if loading is true */}
                    {loading ? (
                        <div className="flex justify-center mb-4">
                            <ClipLoader color="#3498db" loading={loading} size={30} />
                        </div>
                    ) : (
                        <button type="submit" className="btn w-full bg-blue-500 text-white">
                            Login
                        </button>
                    )}
                </form>

                <p className="text-center mt-4">
                    Don't have an account? <Link to="/signup" className="text-blue-500">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default LogIn;
