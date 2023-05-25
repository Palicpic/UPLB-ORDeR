const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DocumentRequestSchema = new Schema(
  {
    document: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: String,
    reasonForRejecting: String,
    dateIssued: Date,
    semester: String,
    acadYear: String,
    reason: String,
    transactionHash: String,
    documentHash: String,
    issuer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    contract: String,
  },
  {
    timestamps: { type: Date, default: Date.now() },
  }
);

module.exports = mongoose.model("DocumentRequest", DocumentRequestSchema);
