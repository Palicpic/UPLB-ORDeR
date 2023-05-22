const router = require("express").Router();
const User = require("../models/user");
const SignatureRequest = require("../models/signatureRequest");

router.post("/new-request", async (req, res) => {
  try {
    const { recipient, subject, message, userId } = req.body;
    const recipientUser = await User.findOne({ email: recipient });

    if (recipientUser) {
      const newSignRequest = await SignatureRequest.create({
        recipient: recipientUser._id,
        subject,
        message,
        user: userId,
        status: "Pending",
      });
      res.status(200).json({ data: "Success" });
    } else {
      res.status(404).json({ dataError: "Recipient not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ dataError: err });
  }
});

router.get("/request/:userId", async (req, res) => {
  SignatureRequest.find({ user: req.params.userId })
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
