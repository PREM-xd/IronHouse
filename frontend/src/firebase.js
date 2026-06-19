import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyC6Pi17TDWNbDnV6izf7VvWspl-ep2cts0",
  authDomain: "iron-house-260a9.firebaseapp.com",
  projectId: "iron-house-260a9",
  storageBucket: "iron-house-260a9.firebasestorage.app",
  messagingSenderId: "372989663477",
  appId: "1:372989663477:web:4e67552a53367774b54dbc",
  measurementId: "G-VE6CG81G4D",
};

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

export const messaging = getMessaging(app);