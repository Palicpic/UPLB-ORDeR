const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Contract = new Schema(
  {
    testNet: String,
    address: String,
    walletAddress: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contract", Contract);
