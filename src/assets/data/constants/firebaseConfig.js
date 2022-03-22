// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);
