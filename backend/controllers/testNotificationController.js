const admin =
  require("../config/firebaseAdmin");

const User =
  require("../models/User");

const sendTestNotification =
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.user.id
        );

      if (!user.fcmToken) {
        return res.status(400).json({
          message:
            "No FCM token found",
        });
      }

      const response =
        await admin
          .messaging()
          .send({
            token: user.fcmToken,

            notification: {
              title:
                "Iron House",
              body:
                "Your push notification is working!",
            },
          });

      console.log(
        "Notification sent:",
        response
      );

      res.json({
        success: true,
      });

    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          error.message,
      });
    }
  };

module.exports = {
  sendTestNotification,
};