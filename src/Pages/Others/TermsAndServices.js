import React from 'react';

const TermsAndServices = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <header className="flex justify-center bg-blue-600 text-white py-6">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-3xl font-semibold">Terms and Services</h1>
                </div>
            </header>

            <main className="max-w-3xl mx-auto p-6">
                <section>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Introduction</h2>
                    <p className="text-lg text-gray-700 mb-4">
                        These Terms and Conditions govern your use of our website and services. By accessing or using this site, you agree to comply with these terms. If you do not agree with any part of these terms, you must not use the services.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">User Obligations</h2>
                    <p className="text-lg text-gray-700 mb-4">
                        You agree not to misuse our services and to comply with all applicable laws and regulations when using our platform.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Account Security</h2>
                    <p className="text-lg text-gray-700 mb-4">
                        You are responsible for maintaining the security of your account and password. We are not liable for any unauthorized access to your account.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Limitation of Liability</h2>
                    <p className="text-lg text-gray-700 mb-4">
                        In no event shall we be liable for any damages, including but not limited to lost profits, arising from the use or inability to use our services.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Changes to Terms</h2>
                    <p className="text-lg text-gray-700 mb-4">
                        We reserve the right to update or modify these Terms and Services at any time. Any changes will be posted on this page, and your continued use of the services will signify your acceptance of those changes.
                    </p>
                </section>
            </main>


        </div>
    );
};

export default TermsAndServices;
