import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const BreachCheck = () => {
    const navigate = useNavigate();
    const [passwords, setPasswords] = useState([]);
    const [breachData, setBreachData] = useState({ breached: 0, safe: 0 });
    const [showUpgradePopup, setShowUpgradePopup] = useState(false);
    const [passwordBreaches, setPasswordBreaches] = useState({}); // To store the breach status of passwords
    const [error, setError] = useState(''); // Error state for session validation

    useEffect(() => {
        const token = localStorage.getItem('token');

        // If no token is found, the user is not logged in
        if (!token) {
            setError('Session expired. Please log in again.');
            navigate('/login'); // Redirect to login page
            return; // Exit early if no token
        }

        fetchPasswords();
    }, [navigate]); // Dependency on navigate to recheck token when it changes

    const fetchPasswords = async () => {
        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.get('https://keylume-backend.onrender.com/api/passwords', {
                headers: { Authorization: `Bearer ${token}` },
            });

            setPasswords(data);

            // Check breach status for each password and update state
            const breachSummary = { breached: 0, safe: 0 };
            const breaches = {};
            for (const { _id, password } of data) {
                const isBreached = await checkPasswordBreach(password);
                breaches[_id] = isBreached;

                if (isBreached) breachSummary.breached++;
                else breachSummary.safe++;
            }
            setPasswordBreaches(breaches);
            setBreachData(breachSummary);
        } catch (error) {
            console.error('Error fetching passwords:', error);
        }
    };

    const checkPasswordBreach = async (password) => {
        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.post(
                'https://keylume-backend.onrender.com/api/passwords/breach-check',
                { password },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            return data.breached; // If breached, return true
        } catch (error) {
            if (error.response && error.response.status === 403) {
                // If the backend returns "Access Denied", it means the user is free.
                console.error('Access denied: Free users cannot check for breached passwords');
                setShowUpgradePopup(true); // Show the upgrade popup for free users
            } else {
                console.error('Error checking password breach:', error);
            }
        }
    };

    const handleUpgrade = () => {
        navigate('/payment');
    };

    return (
        <div className="container">
            <h2 className='text-3xl font-bold mt-8 mb-5 flex justify-center'>Password Breach Check</h2>

            {error && <p className="text-red-500">{error}</p>} {/* Show error message if session is expired */}

            {showUpgradePopup ? (
                <div className="popup max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto my-10 p-6 border border-gray-300 rounded-lg bg-gradient-to-r from-blue-200 to-blue-500 shadow-lg">
                    <h4 className="text-xl font-semibold mb-4 text-black">Upgrade to Pro</h4>
                    <div className="flex flex-col md:flex-row justify-between">
                        <div className="free-features w-full md:w-1/2 pr-0 md:pr-4 mb-4 md:mb-0">
                            <h5 className="text-lg font-medium mb-2 text-black">Free User Features</h5>
                            <ul className="list-disc list-inside text-black">
                                <li><span className="text-green-500">✔️</span> Store passwords</li>
                                <li><span className="text-green-500">✔️</span> Add passwords</li>
                                <li><span className="text-green-500">✔️</span> Edit passwords</li>
                                <li><span className="text-green-500">✔️</span> Delete passwords</li>
                                <li><span className="text-red-500">❌</span> Breached password check</li>
                                <li><span className="text-red-500">❌</span> Detailed password strength analysis</li>
                                <li><span className="text-red-500">❌</span> Priority support</li>
                            </ul>
                        </div>
                        <div className="divider w-px bg-gray-300 mx-4 hidden md:block"></div>
                        <div className="pro-features w-full md:w-1/2 pl-0 md:pl-4">
                            <h5 className="text-lg font-medium mb-2 text-black">Pro User Features</h5>
                            <ul className="list-disc list-inside text-black">
                                <li><span className="text-green-500">✔️</span> Store passwords</li>
                                <li><span className="text-green-500">✔️</span> Add passwords</li>
                                <li><span className="text-green-500">✔️</span> Edit passwords</li>
                                <li><span className="text-green-500">✔️</span> Delete passwords</li>
                                <li><span className="text-green-500">✔️</span> Breached password check</li>
                                <li><span className="text-green-500">✔️</span> Detailed password strength analysis</li>
                                <li><span className="text-green-500">✔️</span> Priority support</li>
                            </ul>
                            <button className="mt-4 bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800" onClick={handleUpgrade}>
                                Upgrade to Pro
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="overflow-x-auto mx-0 lg:mx-[40px]">
                        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="py-2 px-4 text-left text-gray-600 font-semibold">Site Name</th>
                                    <th className="py-2 px-4 text-left text-gray-600 font-semibold">Username/Email</th>
                                    <th className="py-2 px-4 text-left text-gray-600 font-semibold">Password Breach Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {passwords.map(({ _id, siteName, usernameOrEmail }) => (
                                    <tr key={_id} className="hover:bg-gray-100 transition-colors duration-200">
                                        <td className="py-2 px-4 border-b border-gray-300">{siteName}</td>
                                        <td className="py-2 px-4 border-b border-gray-300">{usernameOrEmail}</td>
                                        <td className="py-2 px-4 border-b border-gray-300">
                                            {passwordBreaches[_id] !== undefined
                                                ? passwordBreaches[_id] ? 'Breached' : 'Safe'
                                                : 'Loading...'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div>
                        <h4 className='text-xl font-bold mt-20 mb-5 flex justify-center'>Password Breach Overview</h4>
                        <div className="max-w-md mx-auto my-6 p-4 border border-gray-300 rounded-lg bg-white shadow-md">
                            <h4 className="text-lg font-semibold text-center mb-4">Password Breach Distribution</h4>
                            <div className="flex justify-center">
                                <Pie
                                    data={{
                                        labels: ['Breached', 'Safe'],
                                        datasets: [
                                            {
                                                data: [breachData.breached, breachData.safe],
                                                backgroundColor: ['#FF6384', '#36A2EB'],
                                            },
                                        ],
                                    }}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false, // Allows the chart to fill the container
                                    }}
                                    height={300} // Set a specific height for the chart
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BreachCheck;
