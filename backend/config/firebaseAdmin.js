const {
  initializeApp,
  cert,
} = require("firebase-admin/app");

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT
);

initializeApp({
  credential: cert(
    serviceAccount
  ),
});