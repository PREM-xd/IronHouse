const User = require("../models/User");

const saveFcmToken = async (
  req,
  res
) => {
  try {
    await User.findByIdAndUpdate(
      req.user.id,
      {
        fcmToken: req.body.token,
      }
    );

    res.json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  saveFcmToken,
};