// src/firebase/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyBq3WP0Qn0EAJLIaV5wrOuleTaSzkdvJi4",
  authDomain: "cloudcube-637d9.firebaseapp.com",
  projectId: "cloudcube-637d9",
  storageBucket: "cloudcube-637d9.appspot.com",
  messagingSenderId: "179693374688",
  appId: "1:179693374688:web:cf08969c699ea1e9e69485",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore (db) and Firebase Storage (storage)
const db = getFirestore(app);
const storage = getStorage(app);

// Export the db (Firestore) and storage for use in other files
export { db, storage };



// Your Firebase config object

