import { collection, query, where, getDocs, deleteDoc,  doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';


const updateSession = async (sessionId: string, updateData: any): Promise<void> => {
  try {
    const sessionRef = doc(db, 'sessions', sessionId);
    await updateDoc(sessionRef, updateData);
    console.log('Session updated');
  } catch (error) {
    console.error('Error updating session:', error);
  }
};

const endSession = async (sessionId: string): Promise<void> => {
    // Logic to mark the session as ended in Firestore
    // You might update the session's status and/or endTime
    try {
      const sessionRef = doc(db, 'sessions', sessionId);
      await updateDoc(sessionRef, { status: 'ended', endTime: serverTimestamp() });
    } catch (error) {
      console.error('Error ending session:', error);
    }
  };
  


const cleanupSessions = async (): Promise<void> => {
  const now = new Date();
  const cutoffTime = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 24 hours ago

  try {
    const sessionsRef = collection(db, 'sessions');
    const oldSessionsQuery = query(sessionsRef, where('endTime', '<=', cutoffTime));

    const oldSessionsSnapshot = await getDocs(oldSessionsQuery);
    oldSessionsSnapshot.forEach(async (doc) => {
      // Decide whether to update or delete the session
      // Example: Delete the session
      await deleteDoc(doc.ref);
    });
  } catch (error) {
    console.error('Error cleaning up sessions:', error);
  }
};

export { cleanupSessions, updateSession, endSession };


  
