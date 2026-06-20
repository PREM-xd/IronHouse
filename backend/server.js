const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const cron =
  require("node-cron");

const checkMembershipExpiry =
  require(
    "./utils/checkMembershipExpiry"
  );
dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
const passport =
  require("./config/passport");

const session =
  require("express-session");

app.use(
  session({
    secret:
      process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());

app.use(passport.session());
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
const userStatsRoutes =
require("./routes/userStatsRoutes");
app.use(
  "/api/stats",
  userStatsRoutes
);

const notificationRoutes =
  require("./routes/notificationRoutes");
  app.use(
  "/api/auth",
  notificationRoutes
);
const fcmRoutes =
  require("./routes/fcmRoutes");
  app.use(
  "/api/fcm",
  fcmRoutes
);
const testNotificationRoutes =
  require(
    "./routes/testNotificationRoutes"
  );

app.use(
  "/api/notifications",
  testNotificationRoutes
);

const PORT = process.env.PORT || 8000;
cron.schedule(
  "0 9 * * *",
  async () => {

    console.log(
      "Checking expiring memberships..."
    );

    await checkMembershipExpiry();

  }
);
checkMembershipExpiry();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});