// src/firebase/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration object

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore (db) and Firebase Storage (storage)
const db = getFirestore(app);
const storage = getStorage(app);

// Export the db (Firestore) and storage for use in other files
export { db, storage };



// Your Firebase config object

