const admin = require("../config/firebase");

const sendNotification = async (
  token,
  title,
  body
) => {
  try {
    const response =
      await admin.messaging().send({
        token,

        notification: {
          title,
          body,
        },

        webpush: {
          notification: {
            title,
            body,
            requireInteraction: true,
          },
        },
      });

    console.log(
      "Notification Sent:",
      response
    );

  } catch (error) {
    console.log(
      "FCM ERROR:",
      error
    );
  }
};

module.exports = sendNotification;