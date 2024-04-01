// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARfMmVBHMvbUsW9AzicL1ESsllgxAfNo8",
  authDomain: "j-spender.firebaseapp.com",
  projectId: "j-spender",
  storageBucket: "j-spender.appspot.com",
  messagingSenderId: "870912744690",
  appId: "1:870912744690:web:6e7a1e5362770232bf846b",
  measurementId: "G-Z4XD30EH3W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);