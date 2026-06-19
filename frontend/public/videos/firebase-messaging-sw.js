importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "BAnccXVP1-YKC1ayZDobM6ex_gCVg-4GVEWK5bRRxx_1nAn05AZAgqFS2VjzLP3IVeShfr43LzO0LbWzXYqdN1o",
  authDomain: "iron-house-260a9.firebaseapp.com",
  projectId: "iron-house-260a9",
  storageBucket: "iron-house-260a9.firebasestorage.app",
  messagingSenderId: "372989663477",
  appId: "1:372989663477:web:4e67552a53367774b54dbc",
});

const messaging = firebase.messaging();