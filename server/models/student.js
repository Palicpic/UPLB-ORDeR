let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const Student = new Schema({
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
  idPic: String,
});

module.exports = mongoose.model("Student", Student);
