const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DocumentRequestSchema = new Schema(
  {
    documentName: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: String,
    reasonForRejecting: String,
    dateIssued: Date,
    semester: String,
    acadYear: String,
    otherDocName: String,
    reason: String,
    otherReason: String,
    issuer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("DocumentRequest", DocumentRequestSchema);
