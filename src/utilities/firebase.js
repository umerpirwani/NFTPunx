import { initializeApp } from "firebase/app";
import { getAuth, TwitterAuthProvider } from "firebase/auth";
import { getFunctions } from "firebase/functions";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDTp4T-tOuI8jHgM8berCvzYclAHbZe7w8",
  authDomain: "texture-punx.firebaseapp.com",
  projectId: "texture-punx",
  storageBucket: "texture-punx.appspot.com",
  messagingSenderId: "519175706679",
  appId: "1:519175706679:web:274e09d1e5698d145b47b2",
  measurementId: "G-KR5QBHGP88",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const twitterAuthProvider = new TwitterAuthProvider();
const functions = getFunctions(app);
const db = getFirestore();


export { app, auth, twitterAuthProvider, functions,db };   