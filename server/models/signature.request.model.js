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
    dateIssued: Date,
    message: String,
    pdfFile: String,
    recipient: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      displayName: String,
    },
  },
  {
    timestamps: { type: Date, default: Date.now() },
  }
);

module.exports = mongoose.model("SignatureRequest", SignatureRequestSchema);
