import React from 'react';
import { useUser } from '../context/UserContext'; // Assuming you're using context to manage user data
import { markUserAsAvailable } from '../services/userService'; // Function to update availability
import { findMatchForUser } from '../services/userMatchingService'; // Function to start matching

const MatchButton: React.FC = () => {
  const { user, setUser } = useUser();

  const handleMatchClick = async () => {
    if (user && user.uid) {
      try {
        // Update the user's availability
        await markUserAsAvailable(user.uid);
        setUser({ ...user, available: true });

        // Start the matching process
        const matchedUserId = await findMatchForUser(user.uid);
        if (matchedUserId) {
          // Handle the case where a match is found
          console.log('Matched with user:', matchedUserId);
        } else {
          // Handle the case where no match is found
          console.log('No match found at the moment');
        }
      } catch (error) {
        console.error('Matching process failed:', error);
      }
    }
  };

  return <button onClick={handleMatchClick}>Find Match</button>;
};

export default MatchButton;
