const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SignatureRequestSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    subject: String,
    status: String,
    reasonForRejecting: String,
    dateSigned: Date,
    message: String,
    transactionHash: String,
    documentHash: String,
    pdfFile: Object,
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    contract: String,
  },
  {
    timestamps: { type: Date, default: Date.now() },
  }
);

module.exports = mongoose.model("SignatureRequest", SignatureRequestSchema);
