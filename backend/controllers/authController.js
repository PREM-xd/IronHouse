const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User Registered Successfully",
      user,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Email or Password",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Email or Password",
      });
    }

   const token = jwt.sign(
  {
    id: user._id,
    role: user.role,
  },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
  message: "Login Successful",
  token,
  role: user.role,
});

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const forgotPassword =
  async (req, res) => {
    try {

      const user =
        await User.findOne({
          email: req.body.email,
        });

      if (!user) {
        return res.status(404).json({
          message:
            "User not found",
        });
      }

      const resetToken =
        crypto
          .randomBytes(32)
          .toString("hex");

      user.resetPasswordToken =
        resetToken;

      user.resetPasswordExpire =
        Date.now() +
        15 * 60 * 1000;

      await user.save();

   const resetUrl =
  `https://iron-house-eta.vercel.app/reset-password/${resetToken}`;

await sendEmail(
  user.email,
  "Reset Your Password",
  `
    <h2>Password Reset</h2>
    <p>Click the link below to reset your password:</p>

    <a href="${resetUrl}">
      Reset Password
    </a>

    <p>This link expires in 15 minutes.</p>
  `
);

      res.status(200).json({
        message:
          "Password reset email sent",
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
};
const resetPassword =
  async (req, res) => {
    try {

      const user =
        await User.findOne({
          resetPasswordToken:
            req.params.token,

          resetPasswordExpire:
            {
              $gt: Date.now(),
            },
        });

      if (!user) {
        return res.status(400).json({
          message:
            "Invalid or expired token",
        });
      }

      const salt =
        await bcrypt.genSalt(
          10
        );

      user.password =
        await bcrypt.hash(
          req.body.password,
          salt
        );

      user.resetPasswordToken =
        undefined;

      user.resetPasswordExpire =
        undefined;

      await user.save();

      res.status(200).json({
        message:
          "Password reset successful",
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
};
const googleCallback =
  async (req, res) => {

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
};

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  googleCallback,
};