let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const StudentSchema = new Schema(
  {
    studNum: {
      type: String,
      unique: true,
    },
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
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", StudentSchema);
