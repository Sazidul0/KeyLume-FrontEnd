import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <header className="flex justify-center bg-green-600 text-white py-6">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-3xl font-semibold">Privacy Policy</h1>
                </div>
            </header>

            <main className="max-w-3xl mx-auto p-6">
                <section>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Introduction</h2>
                    <p className="text-lg text-gray-700 mb-4">
                        This Privacy Policy outlines how we collect, use, and protect your personal information when you use our services. By accessing or using our services, you consent to the practices described in this policy.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Information We Collect</h2>
                    <p className="text-lg text-gray-700 mb-4">
                        We collect personal information such as your name, email address, and passwords that you store on our platform. We may also collect non-personal data such as usage statistics.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">How We Use Your Information</h2>
                    <p className="text-lg text-gray-700 mb-4">
                        We use your information to provide, maintain, and improve our services. We may also use it for customer support and to communicate with you about updates and new features.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Data Security</h2>
                    <p className="text-lg text-gray-700 mb-4">
                        We take appropriate measures to protect your personal information. However, no method of transmission or storage is 100% secure. We cannot guarantee the absolute security of your data.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Sharing Your Information</h2>
                    <p className="text-lg text-gray-700 mb-4">
                        We do not sell or share your personal information with third parties, except as required by law or to facilitate our services (e.g., using third-party service providers).
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Rights</h2>
                    <p className="text-lg text-gray-700 mb-4">
                        You have the right to access, update, or delete your personal information stored on our platform. To exercise these rights, please contact us at support@yourcompany.com.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Changes to Privacy Policy</h2>
                    <p className="text-lg text-gray-700 mb-4">
                        We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page, and your continued use of the services will signify your acceptance of those changes.
                    </p>
                </section>
            </main>


        </div>
    );
};

export default PrivacyPolicy;
