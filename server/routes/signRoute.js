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

router.post("/new-request", upload.single("pdfFile"), async (req, res) => {
  try {
    const { recipient, subject, message, userId } = req.body;
    const file = req.file;
    const recipientUser = await User.findOne({ email: recipient });

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

router.get("/request/:userId", async (req, res) => {
  SignatureRequest.find({ user: req.params.userId })
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

module.exports = router;
