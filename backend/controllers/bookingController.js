
const Booking = require("../models/Booking");
const User =
  require("../models/User");

const transporter =
  require("../config/email");
const createBooking = async (req, res) => {
  try {
    const { name, phone, goal, date } = req.body;

    const booking = await Booking.create({
        user: req.user.id,
      name,
      phone,
      goal,
      date,
    });
//     await transporter.sendMail({
//   from: process.env.EMAIL_USER,

//   to: process.env.EMAIL_USER,

//   subject: "🔥 New Trial Booking Received",

//   html: `
//     <h2>New Trial Booking</h2>

//     <p><strong>Name:</strong> ${booking.name}</p>

//     <p><strong>Phone:</strong> ${booking.phone}</p>

//     <p><strong>Goal:</strong> ${booking.goal}</p>

//     <p><strong>Date:</strong> ${booking.date}</p>

//     <hr>

//     <p>IronHouse Gym Admin Notification</p>
//   `,
// });
const user =
  await User.findById(
    req.user.id
  );

// await transporter.sendMail({
//   from:
//     process.env.EMAIL_USER,

//   to:
//     user.email,

//   subject:
//     "Iron House Trial Booking Confirmed",

//   html: `
//     <h2>
//       Iron House Gym
//     </h2>

//     <p>
//       Hello ${user.name},
//     </p>

//     <p>
//       Your free trial has been booked successfully.
//     </p>

//     <p>
//       <strong>Goal:</strong>
//       ${goal}
//     </p>

//     <p>
//       <strong>Date:</strong>
//       ${date}
//     </p>

//     <p>
//       We look forward to seeing you at Iron House Gym.
//     </p>

//     <br>

//     <p>
//       Team Iron House
//     </p>
//   `,
// });
    res.status(201).json({
      message: "Trial Booked Successfully",
      booking,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({
      createdAt: -1,
    });

    res.status(200).json(bookings);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getMyBookings = async (req, res) => {
  try {

    console.log(
      "Logged User ID:",
      req.user.id
    );

    const bookings = await Booking.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    console.log(
      "Bookings Found:",
      bookings
    );

    res.status(200).json(bookings);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(
      req.params.id
    );

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    res.status(200).json({
      message: "Booking Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const updateStatus = async (req, res) => {
  try {

    const booking =
      await Booking.findByIdAndUpdate(
        req.params.id,
        {
          status: req.body.status,
        },
        { new: true }
      );

    res.status(200).json(booking);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  createBooking,
  getBookings,
  getMyBookings,
  deleteBooking,
  updateStatus,
};