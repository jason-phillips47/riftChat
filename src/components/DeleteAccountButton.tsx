import React from 'react';
import { useUser } from '../context/UserContext';
import { deleteAccount } from '../firebase/authService';

const DeleteAccountButton: React.FC = () => {
    const { user, setUser } = useUser();

    const handleDeleteAccount = async () => {
        if (user && user.uid && window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            try {
                await deleteAccount(user.uid); // Now we're sure uid is not undefined
                setUser(null); // Reset the user state to null after account deletion
                // Redirect to home page or show a message
            } catch (error) {
                console.error('Failed to delete account:', error);
                // Optionally handle the error (e.g., show an error message)
            }
        } else {
            console.error('User UID is undefined. Cannot delete account.');
            // Handle the case where UID is undefined
        }
    };

    return (
        <button onClick={handleDeleteAccount}>Delete Account</button>
    );
};

export default DeleteAccountButton;
