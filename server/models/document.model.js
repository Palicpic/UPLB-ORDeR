let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const DocSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("Document", DocSchema);
