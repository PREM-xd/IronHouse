import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "BAnccXVP1-YKC1ayZDobM6ex_gCVg-4GVEWK5bRRxx_1nAn05AZAgqFS2VjzLP3IVeShfr43LzO0LbWzXYqdN1o",
  authDomain: "iron-house-260a9.firebaseapp.com",
  projectId: "iron-house-260a9",
  storageBucket: "iron-house-260a9.firebasestorage.app",
  messagingSenderId: "372989663477",
  appId: "1:372989663477:web:4e67552a53367774b54dbc",
};

const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);