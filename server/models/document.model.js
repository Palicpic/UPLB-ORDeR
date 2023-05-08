let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const DocSchema = new Schema(
  {
    name: {
        type: String,
        required: true,
    },
    deleted: {
        type: Boolean,
        default: false,
    }
  },
  {
      timestamps: true
  }
);

module.exports = mongoose.model('Document', DocSchema);