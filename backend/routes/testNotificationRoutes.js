const express =
  require("express");

const router =
  express.Router();

const protect =
  require(
    "../middleware/authMiddleware"
  );

const {
  sendTestNotification,
} = require(
  "../controllers/testNotificationController"
);

router.post(
  "/test",
  protect,
  sendTestNotification
);

module.exports = router;