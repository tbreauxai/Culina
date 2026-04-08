// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
export const db = getFirestore(app);
export const auth = getAuth(app);