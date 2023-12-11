const User = require("../models/User");
const sendEmailCreationEmail = require("../mail/sendAccountCreationEmail");
const Queue = require("bull");
const { REDIS_PORT, REDIS_URI } = require("../config/redisCredentials");

const emailQueue = new Queue("emailQueue", {
  redis: {
    host: REDIS_URI,
    port: REDIS_PORT,
  },
});

exports.create = async (req, res) => {
  const { name, email } = req.body;

  try {
    const user = await User.create({
      name,
      email,
    });

    await sendEmailCreationEmail({ name, email });

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.sendEmailToUsers = async (req, res) => {
  try {
    const users = await User.find();
    users.forEach((user, index) => {
      emailQueue.add(user).then(() => {
        if (index+1 === users.length) {
          res.json({
            message: "Emails  are Successfully in Queue",
          });
        }
      });
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
