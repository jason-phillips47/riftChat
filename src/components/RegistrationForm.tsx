import React, { useState } from 'react';
import { UserData } from '../types';
import { registerUser } from '../firebase/authService';

const RegistrationForm: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({ email: '', password: '', username: '', available: false});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    try {
      const newUser = await registerUser(userData);
      console.log('Registered user:', newUser);
      // Update your user state/context with newUser
      // For example, if using context: setUser(newUser);
  
      // Redirect or update UI to reflect successful registration
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle registration errors (e.g., display error message to the user)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={userData.email ?? ''} // Fallback to an empty string if email is null
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        placeholder="Email"
        />
      <input
        type="password"
        value={userData.password}
        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
        placeholder="Password"
      />
      <input
        type="text"
        value={userData.username}
        onChange={(e) => setUserData({ ...userData, username: e.target.value })}
        placeholder="Username"
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
