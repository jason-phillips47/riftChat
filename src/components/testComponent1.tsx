//import React, 
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

interface MyDataType {
  id: string;
  name: string;
  // include other fields as per your Firestore document structure
}

const MyComponent = () => {
  const [items, setItems] = useState<MyDataType[]>([]); // Use the type here

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'myCollection'));
      const itemsArray: MyDataType[] = []; // Annotate the type of the array
      querySnapshot.forEach((doc) => {
        const data = doc.data() as MyDataType; // Cast the document data to MyDataType
        itemsArray.push({ ...data, id: doc.id });
      });
      setItems(itemsArray);
    };

    fetchData();
  }, []);

  return (
    <div>
      {items.map(item => (
        <p key={item.id}>{item.name}</p> // Example usage
      ))}
    </div>
  );
};

export default MyComponent;
