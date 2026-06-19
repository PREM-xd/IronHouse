const User = require("../models/User");

const saveFCMToken = async (
  req,
  res
) => {
  try {
    await User.findByIdAndUpdate(
      req.user.id,
      {
        fcmToken:
          req.body.fcmToken,
      }
    );

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  saveFCMToken,
};