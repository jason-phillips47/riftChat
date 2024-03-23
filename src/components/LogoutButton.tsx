import React from 'react';
import { logoutUser } from '../firebase/authService';
import { useUser } from '../context/UserContext';

const LogoutButton: React.FC = () => {
    const { setUser } = useUser();

    const handleLogout = async () => {
        try {
            await logoutUser();
            setUser(null); // Reset the user state to null
        } catch (error) {
            console.error('Failed to log out:', error);
            // Optionally handle the error (e.g., show an error message)
        }
    };

    return (
        <button onClick={handleLogout}>Log Out</button>
    );
};

export default LogoutButton;
