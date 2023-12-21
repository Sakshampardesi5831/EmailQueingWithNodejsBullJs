const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    journeyId:{
      type: mongoose.Types.ObjectId,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = User = mongoose.model("User", UserSchema);
