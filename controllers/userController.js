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
  const { name, email, journeyId } = req.body;

  try {
    const user = await User.create({
      name,
      email,
      journeyId,
    });
    await sendEmailCreationEmail({ name, email, journeyId });
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
      emailQueue.add(user, { delay: 18000 }).then(() => {
        if (index + 1 === users.length) {
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

exports.sendEmailToUsersSpecificOnes = async (req, res) => {
  try {
    const { id } = req.params;
    const jobs = await emailQueue.getJobs();
    if (jobs) {
      jobs.forEach(async (job) => {
        if (job.data._id.toString() === id) {
          await job.remove();
          console.log("Job with ID " + id + " is removed from the queue.");
        } else {
          console.log("Job with ID " + id + " is not in the queue.");
        }
      });
    } else {
      console.log("No jobs found in the queue.");
    }
    res.json({
      msg: "chal rha hai !!!",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
