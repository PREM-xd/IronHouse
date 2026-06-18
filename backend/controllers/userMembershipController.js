const crypto =
  require("crypto");
const razorpay =
  require("../config/razorpay");
const UserMembership =
  require("../models/UserMembership");

const Membership =
  require("../models/Membership");
const User =
  require("../models/User");
const sendEmail = require("../utils/sendEmail");

const buyMembership = async (
  req,
  res
) => {
  try {

    const membership =
      await Membership.findById(
        req.params.id
      );

    if (!membership) {
      return res.status(404).json({
        message: "Plan not found",
      });
    }

    const expiryDate = new Date();

    expiryDate.setMonth(
      expiryDate.getMonth() + 1
    );
const purchase =
  await UserMembership.create({
    user: req.user.id,

    membership:
      membership._id,

    expiryDate,
  });
    res.status(201).json(
      purchase
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const getMyMembership =
  async (req, res) => {
    try {

      const membership =
        await UserMembership.findOne({
          user: req.user.id,
        })
          .populate("membership")
          .sort({
            createdAt: -1,
          });

      res.status(200).json(
        membership
      );

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  };
const getRevenueStats = async (
  req,
  res
) => {
  try {

   const memberships =
  await UserMembership.find()
    .populate("membership");

console.log(memberships);

  const totalRevenue =
  memberships.reduce(
    (sum, item) =>
      sum +
      (item.membership?.price || 0),
    0
  );

    const active =
      memberships.filter(
        (item) =>
          new Date(
            item.expiryDate
          ) > new Date()
      ).length;

    const expired =
      memberships.length -
      active;

    res.status(200).json({
      totalRevenue,
      totalSales:
        memberships.length,
      active,
      expired,
    });

  } catch (error) {
  console.log(error);
    res.status(500).json({
      message: error.message,
    });

  }
};
const createPaymentOrder =
  async (req, res) => {
    try {

      const membership =
        await Membership.findById(
          req.params.id
        );

      if (!membership) {
        return res.status(404).json({
          message:
            "Plan not found",
        });
      }

      const options = {
        amount:
          membership.price *
          100,
        currency: "INR",
        receipt:
          `receipt_${Date.now()}`,
      };

      const order =
        await razorpay.orders.create(
          options
        );

      res.status(200).json({
        order,
        key:
          process.env
            .RAZORPAY_KEY_ID,
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
  };
const verifyPayment = async (
  req,
  res
) => {
  try {

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      membershipId,
    } = req.body;

    const generatedSignature =
      crypto
        .createHmac(
          "sha256",
          process.env
            .RAZORPAY_KEY_SECRET
        )
        .update(
          razorpay_order_id +
          "|" +
          razorpay_payment_id
        )
        .digest("hex");

    if (
      generatedSignature !==
      razorpay_signature
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Payment Verification Failed",
      });
    }

    const membership =
      await Membership.findById(
        membershipId
      );

    const expiryDate =
      new Date();

    expiryDate.setMonth(
      expiryDate.getMonth() + 1
    );

   const purchase =
  await UserMembership.create({
    user: req.user.id,

    membership:
      membership._id,

    expiryDate,

    paymentId:
      razorpay_payment_id,

    amount:
      membership.price,
  });
const user =
  await User.findById(
    req.user.id
  );

await sendEmail(
  user.email,
  "Membership Purchased Successfully",
  `
    <h2>Iron House Gym</h2>

    <p>Hello ${user.name},</p>

    <p>Your membership has been activated successfully.</p>

    <p><strong>Plan:</strong> ${membership.name}</p>

    <p><strong>Amount Paid:</strong> ₹${membership.price}</p>

    <p><strong>Valid Until:</strong> ${expiryDate.toDateString()}</p>

    <br>

    <p>Thank you for choosing Iron House Gym.</p>
  `
);
    res.status(200).json({
      success: true,
      purchase,
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }
};
const renewMembership = async (
  req,
  res
) => {
  try {

    const membership =
      await UserMembership.findById(
        req.params.id
      );

    if (!membership) {
      return res.status(404).json({
        message:
          "Membership not found",
      });
    }

    const currentExpiry =
      new Date(
        membership.expiryDate
      );

    currentExpiry.setMonth(
      currentExpiry.getMonth() + 1
    );

    membership.expiryDate =
      currentExpiry;

    membership.status =
      "Active";

    await membership.save();

    res.status(200).json({
      message:
        "Membership Renewed",
      membership,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};
const createRenewalOrder =
  async (req, res) => {
    try {

      const userMembership =
        await UserMembership.findById(
          req.params.id
        ).populate("membership");

      if (!userMembership) {
        return res.status(404).json({
          message:
            "Membership not found",
        });
      }

      const options = {
        amount:
          userMembership
            .membership.price *
          100,

        currency: "INR",

        receipt:
          `renew_${Date.now()}`,
      };

      const order =
        await razorpay.orders.create(
          options
        );

      res.status(200).json({
        order,
        key:
          process.env
            .RAZORPAY_KEY_ID,
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
};
const getPaymentHistory =
  async (req, res) => {
    try {

      const history =
        await UserMembership.find({
          user: req.user.id,
        })
          .populate(
            "membership"
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json(
        history
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
};
module.exports = {
  buyMembership,
  getMyMembership,
  getRevenueStats,
  createPaymentOrder,
  verifyPayment,
  renewMembership,
  createRenewalOrder,
  getPaymentHistory,
};