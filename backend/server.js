const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const userMembershipRoutes =
  require(
    "./routes/userMembershipRoutes"
  );

const membershipRoutes =
  require("./routes/membershipRoutes");

app.get("/", (req, res) => {
  res.send("Iron House Backend Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use(
  "/api/memberships",
  membershipRoutes
);
app.use(
  "/api/user-memberships",
  userMembershipRoutes
);
const aiRoutes =
  require("./routes/aiRoutes");
  app.use(
  "/api/ai",
  aiRoutes
);
const chatRoutes =
  require(
    "./routes/chatRoutes"
  );
  app.use(
  "/api/chat",
  chatRoutes
);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});