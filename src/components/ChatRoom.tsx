import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc, query, onSnapshot, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { endSession } from '../services/sessionService';


interface ChatRoomProps {
    sessionId: string;
    currentUserId: string;
  }

  interface ChatMessage {
    text: string;
    userId: string;
    timestamp: Date; // Or Date, depending on how you handle timestamps
  }
  const ChatRoom: React.FC<ChatRoomProps> = ({ sessionId, currentUserId }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Messages listener
  useEffect(() => {
    const messagesRef = collection(db, `sessions/${sessionId}/chatRooms/${sessionId}/messages`);
    const q = query(messagesRef);

    
    const unsubscribe = onSnapshot(q, (snapshot) => {
        const msgs = snapshot.docs.map(doc => doc.data() as ChatMessage);
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [sessionId]);

  // Typing status listener
  useEffect(() => {
    const typingStatusRef = doc(db, `sessions/${sessionId}/typingStatus`);

    const unsubscribe = onSnapshot(typingStatusRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        setIsTyping(data.userId !== currentUserId && data.isTyping);
      }
    });

    return () => unsubscribe();
  }, [sessionId, currentUserId]);

  // Send message
  const sendMessage = async () => {
    if (newMessage.trim() === '') return;
    await addDoc(collection(db, `sessions/${sessionId}/chatRooms/${sessionId}/messages`), {
      text: newMessage,
      userId: currentUserId,
      timestamp: serverTimestamp()
    });
    setNewMessage('');
    await updateDoc(doc(db, `sessions/${sessionId}/typingStatus`), { isTyping: false });
  };

  // Handle typing
  const handleTyping = async (e : React.ChangeEvent<HTMLInputElement>) => {
    const typedValue = e.target.value;
    setNewMessage(typedValue);
    await updateDoc(doc(db, `sessions/${sessionId}/typingStatus`), { isTyping: typedValue.length > 0, userId: currentUserId });
  };
  const handleEndSession = async () => {
    await endSession(sessionId);
    // Additional logic to update UI or navigate the user away from the chat room
  };
  
  return (
    <div>
      {messages.map((msg, index) => (
        <p key={index}>{msg.text}</p>
      ))}
      {isTyping && <p>Typing in progress...</p>}
      <input type="text" value={newMessage} onChange={handleTyping} />
      <button onClick={sendMessage}>Send</button>
      <button onClick={handleEndSession}>End Session</button>
    </div>
  );
};

export default ChatRoom;
