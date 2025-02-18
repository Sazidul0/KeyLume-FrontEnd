import React from 'react';


const Banner = () => {
    return (
        <div>
            <div
                className="hero min-h-screen"
                style={{
                    backgroundImage: "url(https://i.ibb.co.com/M9vBBcq/banner.jpg)",
                }}>
                <div className="hero-overlay bg-opacity-30"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-3xl font-bold">Secure Your Digital World with Confidence</h1>
                        <p className="mb-5">
                            Manage, Generate, and Protect your passwords effortlessly with our advanced Password Manager. Your security is our priority, combining robust encryption and intuitive tools for complete peace of mind.
                        </p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>




        </div>
    );
};

export default Banner;