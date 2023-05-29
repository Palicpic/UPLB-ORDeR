const router = require("express").Router();
const multer = require("multer");
const fs = require("fs");

const User = require("../models/user");
const SignatureRequest = require("../models/signatureRequest");

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdir("./uploads/", (err) => {
      cb(null, "./uploads/");
    });
  },
  filename: (req, file, cb) => {
    // Define the filename for each uploaded file
    cb(null, file.originalname);
  },
});

// Create the multer instance
const upload = multer({ storage });

//new signature request
router.post("/new-request", upload.single("pdfFile"), async (req, res) => {
  try {
    const { recipient, subject, message, userId } = req.body;
    const file = req.file;

    //find the recipient
    const recipientUser = await User.findOne({ email: recipient });

    //create new signature request
    const newSignRequest = await SignatureRequest.create({
      recipient: recipientUser._id,
      subject,
      message,
      pdfFile: file,
      user: userId,
      status: "Pending",
    });
    res.status(200).json({ data: "Success" });
  } catch (err) {
    console.log(err);
    res.status(404).json({ dataError: err });
  }
});

//get all student request to show students
router.get("/request-student/:userId", async (req, res) => {
  SignatureRequest.find({ user: req.params.userId })
    .populate("recipient")
    .populate("user")
    .sort({ createdAt: -1 })
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});

//get all student request to show to faculty
router.get("/request-faculty/:userId", async (req, res) => {
  SignatureRequest.find({ recipient: req.params.userId })
    .populate("recipient")
    .populate("user")
    .sort({ createdAt: -1 })
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});

//find email of faculty if exist
router.get("/find-email/:email", async (req, res) => {
  User.find({ email: req.params.email })
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});

//request is rejected
router.post("/sign-document/rejected", async (req, res) => {
  try {
    const { rowId, reasonForRejecting } = req.body;
    const status = "Denied";
    const signatureRequest = await SignatureRequest.findOneAndUpdate(
      { _id: rowId },
      {
        reasonForRejecting,
        status,
      }
    );
    fs.unlinkSync(`./uploads/${signatureRequest.pdfFile.filename}`);
    res.status(200).json({ data: "Success" });
  } catch (err) {
    console.log(err);
    res.status(404).json({ dataError: err });
  }
});

module.exports = router;
