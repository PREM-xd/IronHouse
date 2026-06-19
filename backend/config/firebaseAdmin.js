const admin = require("firebase-admin");

console.log(
  "FIREBASE ENV EXISTS:",
  !!process.env.FIREBASE_SERVICE_ACCOUNT
);

console.log(
  "ADMIN:",
  admin
);

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT
);

admin.initializeApp({
  credential: admin.credential.cert(
    serviceAccount
  ),
});

module.exports = admin;