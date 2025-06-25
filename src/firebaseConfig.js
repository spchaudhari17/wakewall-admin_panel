import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAbs3PcWXjL9XOyuVz8a0LdRNeA6bt014k",
  authDomain: "wakewall-6d871.firebaseapp.com",
  databaseURL: "https://wakewall-6d871-default-rtdb.firebaseio.com",
  projectId: "wakewall-6d871",
  storageBucket: "wakewall-6d871.firebasestorage.app",
  messagingSenderId: "650125019746",
  appId: "1:650125019746:web:0b7e329bb99a8a1cd7df3b",
  measurementId: "G-RBKEKZD9FV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
const storage = getStorage(app);


export { db, storage};