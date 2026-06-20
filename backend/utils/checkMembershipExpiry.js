const UserMembership =
  require("../models/UserMembership");

const User =
  require("../models/User");

const {
  getMessaging,
} = require("firebase-admin/messaging");

require("../config/firebaseAdmin");

const checkMembershipExpiry =
  async () => {

    console.log(
      "checkMembershipExpiry STARTED"
    );

    try {

      const threeDaysLater =
        new Date();

      threeDaysLater.setDate(
        threeDaysLater.getDate() + 3
      );

      const start =
        new Date(
          threeDaysLater
        );

      start.setHours(
        0,
        0,
        0,
        0
      );

      const end =
        new Date(
          threeDaysLater
        );

      end.setHours(
        23,
        59,
        59,
        999
      );

      const memberships =
        await UserMembership.find({
          expiryDate: {
            $gte: start,
            $lte: end,
          },
          status: "Active",
        });
console.log(
  "MEMBERSHIPS FOUND:",
  memberships.length
);

console.log(
  "START:",
  start
);

console.log(
  "END:",
  end
);

console.log(
  memberships
);
      for (const item of memberships) {
console.log(
  "PROCESSING:",
  item._id
);
        const user =
          await User.findById(
            item.user
          );

        if (!user?.fcmToken)
          continue;

        await getMessaging()
          .send({
            token:
              user.fcmToken,

            notification: {
              title:
                "Membership Reminder",

              body:
                "Your membership expires in 3 days. Renew now to continue training.",
            },

            webpush: {
              notification: {
                title:
                  "Membership Reminder",

                body:
                  "Your membership expires in 3 days. Renew now to continue training.",
              },
            },
          });

        console.log(
          `Reminder sent to ${user.email}`
        );
      }

    } catch (error) {

      console.log(error);

    }
};

module.exports =
  checkMembershipExpiry;