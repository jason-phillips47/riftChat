import { db } from '../firebase/firebaseConfig';
import { collection, query, where, getDocs, updateDoc, doc, addDoc, serverTimestamp } from 'firebase/firestore';

// Assuming you have a type for User
// import { UserData } from '../types'; // in case userdata needed uncomment

const findMatchForUser = async (currentUserId: string): Promise<string | null> => {
  const usersRef = collection(db, 'users');
  const availableUsersQuery = query(usersRef, where('available', '==', true));

  const availableUsersSnapshot = await getDocs(availableUsersQuery);
  const availableUsers: string[] = [];
  availableUsersSnapshot.forEach(doc => {
    if (doc.id !== currentUserId) { // Exclude the current user
      availableUsers.push(doc.id);
    }
  });

  if (availableUsers.length > 0) {
    const matchedUserId = availableUsers[Math.floor(Math.random() * availableUsers.length)]; // Randomly pick a user
    await createSession(currentUserId, matchedUserId);
    return matchedUserId;
  } else {
    // No available users
    return null;
  }
};

export interface SessionData {
  sessionId: string;
  userIds: string[];
  startTime: Date;
}

const createSession = async (userId1: string, userId2: string): Promise<SessionData> => {
  // Mark both users as unavailable
  await updateDoc(doc(db, 'users', userId1), { available: false });
  await updateDoc(doc(db, 'users', userId2), { available: false });

  // Define the session data
  const sessionData = {
    userIds: [userId1, userId2],
    startTime: serverTimestamp(),
    endTime: null, // Can be updated when the session ends
    status: 'active' // Can be 'active', 'ended', etc.
  };

  // Add the new session to the 'sessions' collection
  try {
    const sessionRef = await addDoc(collection(db, 'sessions'), sessionData);
    console.log('Session created with ID:', sessionRef.id);

    // Return the session data
    return {
      sessionId: sessionRef.id,
      userIds: [userId1, userId2],
      startTime: new Date() // This will be the local time; adjust as needed
    };
  } catch (error) {
    console.error('Error creating session:', error);
    throw error;
  }
};

export {  findMatchForUser, createSession };
