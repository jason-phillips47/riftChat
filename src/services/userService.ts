import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';


const markUserAsAvailable = async (userId: string): Promise<void> => {
  const userRef = doc(db, 'users', userId);
  try {
    await updateDoc(userRef, { available: true });
  } catch (error) {
    console.error('Error setting user as available:', error);
  }
};

const markUserAsUnavailable = async (userId: string): Promise<void> => {
    const userRef = doc(db, 'users', userId);
    try {
      await updateDoc(userRef, { available: false });
    } catch (error) {
      console.error('Error setting user as unavailable:', error);
    }
  };
  
  
export { markUserAsAvailable, markUserAsUnavailable };
