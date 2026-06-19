const express = require("express");
const passport = require("passport");

const router = express.Router();

const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post(
  "/forgot-password",
  forgotPassword
);

router.post(
  "/reset-password/:token",
  resetPassword
);

// GOOGLE LOGIN
router.get(
  "/google",
  passport.authenticate(
    "google",
    {
      scope: ["profile", "email"],
    }
  )
);

router.get(
  "/google/callback",
  passport.authenticate(
    "google",
    {
      session: false,
      failureRedirect:
        "https://iron-house-eta.vercel.app/login",
    }
  ),
  (req, res) => {
    const jwt = require("jsonwebtoken");

    const token = jwt.sign(
      {
        id: req.user._id,
        role: req.user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.redirect(
      `https://iron-house-eta.vercel.app/google-success?token=${token}`
    );
  }
);

module.exports = router;