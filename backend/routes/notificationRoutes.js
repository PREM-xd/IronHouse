const express = require("express");

const router = express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const {
  saveFCMToken,
} = require(
  "../controllers/notificationController"
);

router.post(
  "/save-fcm-token",
  authMiddleware,
  saveFCMToken
);

module.exports = router;