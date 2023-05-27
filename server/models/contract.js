const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Contract = new Schema(
  {
    testNet: String,
    address: String,
    walletAddress: String,
    status: { type: String, default: "Active" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contract", Contract);
