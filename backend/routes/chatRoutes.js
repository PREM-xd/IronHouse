
const express =
  require("express");

const router =
  express.Router();

const {
  askCoach
} = require(
  "../controllers/chatController"
);

router.post(
  "/ask",
  askCoach
);

module.exports =
  router;