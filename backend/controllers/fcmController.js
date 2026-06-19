const User = require("../models/User");

const saveFcmToken = async (
  req,
  res
) => {
  try {

    console.log(
      "USER:",
      req.user.id
    );

    console.log(
      "FCM TOKEN:",
      req.body.token
    );

    const user =
      await User.findByIdAndUpdate(
        req.user.id,
        {
          fcmToken: req.body.token,
        },
        {
          new: true,
        }
      );

    console.log(
      "UPDATED USER:",
      user
    );

    res.json({
      success: true,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  saveFcmToken,
};