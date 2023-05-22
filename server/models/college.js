let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const College = new Schema({
  name: {
    type: String,
    unique: true,
  },
});

module.exports = mongoose.model("College", College);
