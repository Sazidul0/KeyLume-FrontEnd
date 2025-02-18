import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Modal Component
const Modal = ({ type, data, onClose, onSave }) => {
    const [formState, setFormState] = useState({
        siteName: data?.siteName || '',
        usernameOrEmail: data?.usernameOrEmail || '',
        password: data?.password || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState({ ...formState, [name]: value });
    };

    const handleSubmit = () => {
        onSave(formState);
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">
                    {type === 'create' ? 'Create New Password' : 'Edit Password'}
                </h2>
                <form className="space-y-4">
                    <input
                        type="text"
                        name="siteName"
                        value={formState.siteName}
                        onChange={handleChange}
                        placeholder="Site Name"
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="text"
                        name="usernameOrEmail"
                        value={formState.usernameOrEmail}
                        onChange={handleChange}
                        placeholder="Username or Email"
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="password"
                        name="password"
                        value={formState.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="w-full p-2 border rounded"
                    />
                </form>
                <div className="mt-4 flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white py-1 px-4 rounded hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

// Main ManagePasswords Component
const ManagePasswords = () => {
    const [passwords, setPasswords] = useState([]); // Initialize as an array
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(''); // 'create' or 'edit'
    const [currentPassword, setCurrentPassword] = useState(null);
    const [error, setError] = useState(''); // Error state
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        // If no token is found, the user is not logged in
        if (!token) {
            setError('Session expired. Please log in again.');
            navigate('/login'); // Redirect to login page
            return; // Exit early if no token
        }

        const fetchPasswords = async () => {
            try {
                const response = await fetch('https://keylume-backend.onrender.com/api/passwords', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                // Ensure `data` is an array before setting it
                if (Array.isArray(data)) {
                    setPasswords(data);
                } else {
                    console.error('Unexpected API response:', data);
                    setPasswords([]);
                }
            } catch (error) {
                console.error('Error fetching passwords:', error);
            }
        };

        fetchPasswords();
    }, [navigate]); // Dependency on navigate to recheck token when it changes

    const handleCreate = () => {
        setModalType('create');
        setCurrentPassword(null);
        setIsModalOpen(true);
    };

    const handleEdit = (password) => {
        setModalType('edit');
        setCurrentPassword(password);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await fetch(`https://keylume-backend.onrender.com/api/passwords/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setPasswords(passwords.filter((password) => password._id !== id));
        } catch (error) {
            console.error('Error deleting password:', error);
        }
    };

    const handleModalSave = async (passwordData) => {
        try {
            const token = localStorage.getItem('token');
            if (modalType === 'create') {
                const response = await fetch('https://keylume-backend.onrender.com/api/passwords', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(passwordData),
                });
                const newPassword = await response.json();
                setPasswords([...passwords, newPassword]);
            } else if (modalType === 'edit') {
                const response = await fetch(`https://keylume-backend.onrender.com/api/passwords/${currentPassword._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(passwordData),
                });
                const updatedPassword = await response.json();
                setPasswords(passwords.map((pw) => (pw._id === updatedPassword._id ? updatedPassword : pw)));
            }
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error saving password:', error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-4">Password Manager</h1>
            {error && <p className="text-red-500">{error}</p>} {/* Show error message */}
            {passwords.length === 0 ? (
                <div className="bg-white p-6 rounded shadow-md w-full max-w-4xl">
                    <p className="text-gray-600 mb-4">No passwords found.</p>
                    <button
                        onClick={handleCreate}
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        Create New Password
                    </button>
                </div>
            ) : (
                <div className="bg-white p-6 rounded shadow-md w-full max-w-4xl overflow-x-auto">
                    <table className="w-full table-auto border-collapse">
                        <thead>
                            <tr className="bg-gray-200 text-left">
                                <th className="p-2 border">Site Name</th>
                                <th className="p-2 border">Username/Email</th>
                                <th className="p-2 border">Password</th>
                                <th className="p-2 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {passwords.map((password) => (
                                <tr key={password._id} className="hover:bg-gray-100">
                                    <td className="p-2 border">{password.siteName}</td>
                                    <td className="p-2 border">{password.usernameOrEmail}</td>
                                    <td className="p-2 border">{password.password}</td>
                                    <td className="p-2 border flex gap-2">
                                        <button
                                            onClick={() => handleEdit(password)}
                                            className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(password._id)}
                                            className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button
                        onClick={handleCreate}
                        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        Create New Password
                    </button>
                </div>
            )}

            {isModalOpen && (
                <Modal
                    type={modalType}
                    data={currentPassword}
                    onClose={closeModal}
                    onSave={handleModalSave}
                />
            )}
        </div>
    );
};

export default ManagePasswords;
