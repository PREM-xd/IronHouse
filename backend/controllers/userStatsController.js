const UserStats =
  require("../models/UserStats");

exports.getMyStats =
  async (req, res) => {

    try {

      let stats =
        await UserStats.findOne({
          user: req.user.id,
        });

      if (!stats) {

        stats =
          await UserStats.create({
            user: req.user.id,
          });

      }

      res.json(stats);

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

};

exports.updateStats =
  async (req, res) => {

    try {

      const stats =
        await UserStats.findOneAndUpdate(

          {
            user: req.user.id,
          },

          req.body,

          {
            new: true,
            upsert: true,
          }
        );

      res.json(stats);

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

};