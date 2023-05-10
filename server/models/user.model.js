let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    googleId: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: String,
    middleName: String,
    lastName: String,
    displayName: String,
    profilePhoto: String,
    active: Boolean,
    college: String,
    role: {
      type: String,
      default: null,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      default: null,
    },
    lastVisited: { type: Date, default: new Date() },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
