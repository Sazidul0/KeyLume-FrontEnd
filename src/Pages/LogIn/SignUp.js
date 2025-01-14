import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha'; // Import ReCAPTCHA

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [captcha, setCaptcha] = useState(null); // Store CAPTCHA response
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleCaptchaChange = (value) => {
        setCaptcha(value); // Set CAPTCHA response value
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!captcha) {
            setError('Please complete the CAPTCHA');
            return;
        }

        try {
            // Send userType as 'free' (no need for user input)
            await axios.post('https://keylume-backend.onrender.com/register', {
                username,
                email,
                password,
                userType: 'free', // Default to 'free'
                captcha, // Send CAPTCHA response
            });
            navigate('/login'); // Redirect to login page after successful signup
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div className="flex h-screen justify-center items-center bg-gray-100">
            <div className="card w-96 bg-white shadow-lg p-6">
                <h2 className="text-center text-2xl font-bold mb-4">Sign Up</h2>
                <form onSubmit={handleSignup}>
                    <div className="form-control w-full mb-4">
                        <label className="label">
                            <span className="label-text">Username</span>
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Your Username"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

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
                            sitekey="6LcrCrcqAAAAABF9pExJMAC0bxueo_B7fRbeQQNA" // Replace with your reCAPTCHA site key
                            onChange={handleCaptchaChange}
                        />
                    </div>

                    {error && <p className="text-red-500 mb-4">{error}</p>}

                    <button type="submit" className="btn w-full bg-blue-500 text-white">
                        Sign Up
                    </button>
                </form>

                <p className="text-center mt-4">
                    Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
