import React from 'react';
import upload from '../../images/upload.png';
import generate from '../../images/generate.png';
import strength from '../../images/strength.png';
import breach from '../../images/breach.png';

const BusinessSummary = () => {

    const FeatureCard = ({ title, description, icon }) => {
        return (
            <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center w-96">
                <img src={icon} alt={title} className="w-12 h-12 mb-3" />
                <h3 className="text-lg font-semibold mb-1">{title}</h3>
                <p className="text-gray-600 text-center text-sm">{description}</p>
            </div>
        );
    };

    return (
        <div className="py-16 bg-gray-100 lg:px-80">
            <div className="container text-center lg:px-10">
                <h2 className="text-5xl font-bold text-black mb-4">Our Features</h2>
                <p className="text-lg text-gray-700 mb-10">Discover the amazing features we offer to enhance your password management experience.</p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <FeatureCard
                        title="Store Passwords"
                        description="Securely store all your passwords in one place, accessible only to you."
                        icon={upload} // Use the uploaded image for this feature
                    />
                    <FeatureCard
                        title="Generate Secure Passwords"
                        description="Create strong, unique passwords with our password generator to enhance your security."
                        icon={generate} // Use the image for generating passwords
                    />
                    <FeatureCard
                        title="Check Data Breaches"
                        description="Easily check if any of your passwords have been compromised in known data breaches."
                        icon={breach} // Use the image for checking breaches
                    />
                    <FeatureCard
                        title="Password Strength Checker"
                        description="Evaluate the strength of your passwords and get tips to improve them."
                        icon={strength} // Use the image for strength checking
                    />
                </div>
            </div>
        </div>
    );
};

export default BusinessSummary;