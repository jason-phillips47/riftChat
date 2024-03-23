import React, { useState, useEffect } from 'react';
import RegistrationForm from './components/RegistrationForm';
import { UserProvider } from './context/UserContext';
import LoginForm from './components/LoginForm'; // Assume you have a similar LoginForm component
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig';
import { UserData } from './types';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase/firebaseConfig';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LogoutButton from './components/LogoutButton';
import DeleteAccountButton from './components/DeleteAccountButton';
import MatchButton from './components/MatchButton';
import ChatSessionManager from './components/ChatSessionManager';

function App() {
  const [count, setCount] = useState(0)
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in, fetch additional user info like username
        fetchUsername(firebaseUser.uid).then((username) => {
          setUser({ uid: firebaseUser.uid, email: firebaseUser.email, username: username, available: false });
        });
      } else {
        // User is signed out
        setUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const fetchUsername = async (uid: string): Promise<string> => {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData.username || '';
    } else {
      return '';
    }
  };

  return (
    <>
    <UserProvider>
    {user ? (
      <div>
        <div>Welcome, {user.username}!</div> 
        <LogoutButton />
<DeleteAccountButton />
<MatchButton />
        {/* Other user-specific content */}
      </div>
      ) : (
        <>
          <LoginForm />
          <RegistrationForm />
          
        </>
      )}
    </UserProvider>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      
    </>
  )
}

export default App
