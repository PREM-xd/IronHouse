const express = require("express");

const router = express.Router();

const {
  saveFcmToken,
} = require(
  "../controllers/fcmController"
);

const {
  protect,
} = require("../middleware/authMiddleware");

router.post(
  "/save-token",
  protect,
  saveFcmToken
);

module.exports = router;