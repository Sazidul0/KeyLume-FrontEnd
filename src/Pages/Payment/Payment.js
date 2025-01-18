import React, { useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Payment = () => {
    const [amount, setAmount] = useState(5000); // Example amount in cents ($50)
    const [clientSecret, setClientSecret] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    useEffect(() => {
        // Create a payment intent and get the clientSecret
        const createPaymentIntent = async () => {
            try {
                const response = await axios.post("https://keylume-backend.onrender.com/api/payment/create-payment-intent", {
                    amount: amount,
                });
                setClientSecret(response.data.clientSecret);
            } catch (error) {
                setErrorMessage("Failed to fetch payment intent");
            }
        };

        createPaymentIntent();
    }, [amount]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements || !clientSecret) {
            return; // Make sure Stripe.js has loaded and clientSecret is available
        }

        const cardElement = elements.getElement(CardElement);

        // Confirm the payment with the card element
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
            },
        });

        if (error) {
            setErrorMessage(error.message);
        } else if (paymentIntent.status === "succeeded") {
            // Payment successful, you can now upgrade the user
            try {
                const response = await axios.post(
                    "https://keylume-backend.onrender.com/api/payment/users/upgrade",
                    { paymentIntentId: paymentIntent.id },
                    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
                );
                // Redirect user after successful upgrade
                navigate("/managePass");
            } catch (error) {
                setErrorMessage("Error upgrading user to Pro");
            }
        }
    };

    return (
        <div className="max-w-md mx-auto my-10 p-6 border border-gray-300 rounded-lg bg-white shadow-lg">
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Upgrade to Pro</h2>
            <p className="text-center text-gray-600 mb-4">Unlock premium features with a one-time payment.</p>
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label className="block text-gray-700 mb-2">Payment Information</label>
                    <div className="card-element-container border border-gray-300 rounded-lg p-4 bg-gray-50">
                        {/* CardElement from Stripe */}
                        <CardElement options={{
                            style: {
                                base: {
                                    color: '#32325d',
                                    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                                    fontSize: '16px',
                                    fontSmoothing: 'antialiased',
                                    lineHeight: '24px',
                                    padding: '10px',
                                },
                                invalid: {
                                    color: '#fa755a',
                                    iconColor: '#fa755a',
                                },
                            },
                        }} />
                    </div>
                </div>

                {/* Display any error message */}
                {errorMessage && <div className="text-red-500 text-sm mb-4">{errorMessage}</div>}

                <button
                    type="submit"
                    disabled={!stripe}
                    className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200 font-semibold shadow-md"
                >
                    Pay ${amount / 100} USD
                </button>
            </form>
            <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">By proceeding, you agree to our <a href="/terms" className="text-blue-500 hover:underline">Terms of Service</a> and <a href="/privacy" className="text-blue-500 hover:underline">Privacy Policy</a>.</p>
            </div>
        </div>
    );
};

export default Payment;
