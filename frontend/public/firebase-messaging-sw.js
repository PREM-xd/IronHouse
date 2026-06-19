importScripts(
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyC6Pi17TDWNbDnV6izf7VvWspl-ep2cts0",
  authDomain: "iron-house-260a9.firebaseapp.com",
  projectId: "iron-house-260a9",
  storageBucket: "iron-house-260a9.firebasestorage.app",
  messagingSenderId: "372989663477",
  appId: "1:372989663477:web:4e67552a53367774b54dbc",
});

const messaging = firebase.messaging();