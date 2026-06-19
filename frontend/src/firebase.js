// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6Pi17TDWNbDnV6izf7VvWspl-ep2cts0",
  authDomain: "iron-house-260a9.firebaseapp.com",
  projectId: "iron-house-260a9",
  storageBucket: "iron-house-260a9.firebasestorage.app",
  messagingSenderId: "372989663477",
  appId: "1:372989663477:web:4e67552a53367774b54dbc",
  measurementId: "G-VE6CG81G4D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);