let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const User = new Schema(
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
    isActive: Boolean,
    college: String,
    role: {
      type: String,
      default: null,
    },
    student: {
      type: {
        number: String,
        classification: String,
        saisNum: String,
        address: String,
        mobileNum: String,
        adviser: String,
        degreeProgram: String,
        contactPerson: {
          type: {
            name: String,
            address: String,
            mobileNum: String,
          },
        },
      },
      default: null,
    },
    lastVisited: { type: Date, default: new Date() },
  },
  {
    timestamps: { type: Date, default: new Date() },
  }
);

module.exports = mongoose.model("User", User);
