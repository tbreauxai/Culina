// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYb-UhORqDvHpmavFt3fSf2OMbhSdo8Qs",
  authDomain: "culina-f1030.firebaseapp.com",
  projectId: "culina-f1030",
  storageBucket: "culina-f1030.firebasestorage.app",
  messagingSenderId: "892727431945",
  appId: "1:892727431945:web:42f5cc3e6f0034c53ab9d8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firestore with offline persistence
// This allows the app to work fully offline and syncs in the background when reconnected!
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager()
  })
});

export const auth = getAuth(app);