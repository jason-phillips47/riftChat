// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC846biBxBbvaVHfOxTG8lIU1S7mmCb-S8",
    authDomain: "chatrift-159c5.firebaseapp.com",
    projectId: "chatrift-159c5",
    storageBucket: "chatrift-159c5.appspot.com",
    messagingSenderId: "103207928788",
    appId: "1:103207928788:web:db5415c1f59b2ea3f70c41",
    measurementId: "G-X9TBB5JVD8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Optional: Initialize Analytics
const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app);

const auth = getAuth(app);

export { app, analytics, db, auth };
