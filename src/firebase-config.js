// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYR0hM2usQhMqzt3XzHUveXicYrVNQFBE",
  authDomain: "connectify-9ffeb.firebaseapp.com",
  projectId: "connectify-9ffeb",
  storageBucket: "connectify-9ffeb.appspot.com",
  messagingSenderId: "1071431452297",
  appId: "1:1071431452297:web:ee68b1d52237b7767ee858",
  measurementId: "G-SE1X7N8J76"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);