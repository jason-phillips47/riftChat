import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, deleteUser } from 'firebase/auth';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';
import { UserData, AuthUser } from '../types';

export const registerUser = async (userData: UserData): Promise<UserData> => {
    const { email, password, username } = userData;
  
    // Ensure email and password are not null before proceeding
    if (!email || !password) {
      throw new Error("Email and password must be provided");
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Assuming you also store user data in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        username: username,
        email: email // Assuming email is non-null here as we checked above
      });
  
      // Return the complete user data including the uid
      return {
        uid: user.uid,
        email: user.email,
        username: username,
        available: false
      };
    } catch (error) {
      console.error('Error registering new user:', error);
      throw error;
    }
  };
  
  

export const loginUser = async (email: string, password: string): Promise<UserData> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if user and user.email are not null, otherwise provide default values
      if (user && user.email) {
        return { email: user.email, uid: user.uid, username: '', available: false };
      } else {
        // Handle the case where user or user.email is null
        return { email: '', uid: '', username: '', available: false }; // Provide default values
      }
    } catch (error) {
      console.error('Error logging in user:', error);
      throw error;
    }
};

export const logoutUser = async (): Promise<void> => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error('Error logging out user:', error);
        throw error;
    }
};

export const deleteAccount = async (uid: string): Promise<void> => {
    try {
        // Delete user data from Firestore
        await deleteDoc(doc(db, 'users', uid));

        // Delete the user from Firebase Authentication
        if (auth.currentUser) {
            await deleteUser(auth.currentUser);
        }
    } catch (error) {
        console.error('Error deleting user account:', error);
        throw error;
    }
};