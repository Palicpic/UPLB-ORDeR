let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const CollegeSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
});

module.exports = mongoose.model("College", CollegeSchema);
