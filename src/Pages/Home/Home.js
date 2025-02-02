import React from 'react';
import Banner from './Banner/Banner';
import stpass from '../../images/strengthPass.png';
import brpass from '../../images/breachPass.png'
import { useNavigate } from 'react-router-dom';
import BusinessSummary from './BusinessSummary';

const Home = () => {
    const navigate = useNavigate();

    const handleStrengthCheck = () => {
        // Navigate to /breach route
        navigate('/strengthCheck');
    };

    const handleBreachCheck = () => {
        // Navigate to /breach route
        navigate('/breachCheck');
    };


    return (
        <div>
            <Banner></Banner>


            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img
                        src={stpass}
                        className="w-full h-auto max-w-sm rounded-lg shadow-2xl" />
                    <div>
                        <h1 className="text-5xl font-bold">Password Strength Check!</h1>
                        <p className="py-6">
                            Our Password Strength Check helps you create robust passwords that are resistant to common attacks like brute force and dictionary attacks. The feature evaluates the complexity of your password and provides real-time feedback on how to improve it, ensuring that your password is secure enough to protect your accounts.
                        </p>
                        <button className="btn btn-primary" onClick={handleStrengthCheck}>Check Strength</button>
                    </div>
                </div>
            </div>


            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row ">
                    <img
                        src={brpass}
                        className="w-full h-auto max-w-sm rounded-lg shadow-2xl" />
                    <div>
                        <h1 className="text-5xl font-bold">Password Breach Check!</h1>
                        <p className="py-6">
                            Our Password Breach Check feature helps you ensure that your password hasn't been exposed in a known data breach. By checking your password against a global database of compromised credentials, we can alert you if your password has been found in any breach. This way, you can take immediate action to secure your accounts and prevent unauthorized access.
                        </p>
                        <button className="btn btn-primary" onClick={handleBreachCheck}>Check for Breach</button>
                    </div>
                </div>
            </div>



            {/* https://github.com/Sazidul0/UpWingHandTools-Client/blob/main/src/Pages/Home/BusinessSummary.js */}
            <BusinessSummary></BusinessSummary>


        </div>
    );
};

export default Home;