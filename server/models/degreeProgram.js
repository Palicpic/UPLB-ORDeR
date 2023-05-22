let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const DegreeProgram = new Schema({
  name: {
    type: String,
    unique: true,
  },
});

module.exports = mongoose.model("DegreeProgram", DegreeProgram);
