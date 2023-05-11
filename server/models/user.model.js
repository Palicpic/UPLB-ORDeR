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
    name: {
      firstName: String,
      middleName: String,
      lastName: String,
      displayName: String,
    },
    profilePhoto: String,
    active: Boolean,
    college: String,
    role: {
      type: String,
      default: null,
    },
    student: {
      type: {
        studNum: String,
        classification: String,
        saisNum: String,
        address: String,
        mobileNum: String,
        adviser: String,
        degProg: String,
        contactName: String,
        contactPNum: String,
        contactAdd: String,
        idPic: String,
      },
      default: null,
    },
    lastVisited: { type: Date, default: new Date() },
  },
  {
    timestamps: { type: Date, default: new Date() },
  }
);

module.exports = mongoose.model("User", UserSchema);
