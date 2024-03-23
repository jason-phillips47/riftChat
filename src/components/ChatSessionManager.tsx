import React, { useState, useEffect } from 'react';
import ChatRoom from './ChatRoom';
import { createSession, SessionData } from '../services/userMatchingService';
import { useAuthUser } from './UserContext';
import { query, collection, where, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const ChatSessionManager: React.FC = () => {
  const [currentSession, setCurrentSession] = useState<SessionData | null>(null);
  const [matchingStatus, setMatchingStatus] = useState('idle'); // 'idle', 'searching', 'matched', 'noMatch'
  const currentUser = useAuthUser();

  useEffect(() => {
    if (currentUser && currentUser.uid) {
      startMatchingProcess(currentUser.uid);
    }
  }, [currentUser]);

  const startMatchingProcess = async (userId: string) => {
    setMatchingStatus('searching');
    await updateDoc(doc(db, 'users', userId), { searching: true });

    // Query for other searching users
    const q = query(collection(db, 'users'), where('searching', '==', true), where('uid', '!=', userId));
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const searchingUsers = snapshot.docs.map(doc => doc.data());
      if (searchingUsers.length > 0) {
        // Found a match
        const matchedUserId = searchingUsers[0].uid; // For simplicity, take the first match
        const newSession = await createSession(userId, matchedUserId);
        setCurrentSession(newSession);
        setMatchingStatus('matched');
        unsubscribe(); // Stop listening for more matches
      }
    });

    // Set a timeout to stop searching after 10 seconds
    setTimeout(() => {
      if (matchingStatus === 'searching') {
        setMatchingStatus('noMatch');
        unsubscribe(); // Stop the query listener
        // Reset user's searching status in Firestore
        updateDoc(doc(db, 'users', userId), { searching: false });
      }
    }, 10000); // 10 seconds
  };

  // Firestore listener for session updates
  useEffect(() => {
    if (currentUser && currentUser.uid) {
      const q = query(
        collection(db, 'sessions'),
        where('userIds', 'array-contains', currentUser.uid),
        where('status', '==', 'active')
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if ((change.type === 'added' || change.type === 'modified') && matchingStatus === 'searching') {
            const sessionData = change.doc.data() as SessionData;
            setCurrentSession(sessionData);
            setMatchingStatus('matched');
          }
        });
      });

      return () => unsubscribe();
    }
  }, [currentUser, matchingStatus]);

  return (
    <div>
      {matchingStatus === 'searching' && <div>Searching for a match...</div>}
      {matchingStatus === 'noMatch' && <div>No matches found. Please try again.</div>}
      {matchingStatus === 'matched' && currentSession && currentUser && (
        <ChatRoom sessionId={currentSession.sessionId} currentUserId={currentUser.uid} />
      )}
    </div>
  );
};

export default ChatSessionManager;
