import React, { useState } from 'react';
import { loginUser } from '../firebase/authService';
import { useUser } from '../context/UserContext';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { setUser } = useUser(); // Get setUser from context


  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userData = await loginUser(email, password);
      // Handle successful login
      // You might want to redirect the user or change the UI state
      setUser(userData); // Update global user state

    } catch (err) {
      // Handle login error
      setError('Failed to log in. Please check your credentials.');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <div>{error}</div>}
      <button type="submit">Log In</button>
    </form>
  );
};

export default LoginForm;
