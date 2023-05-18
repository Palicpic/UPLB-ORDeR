const router = require("express").Router();
const User = require("../models/user.model");
const SignatureRequest = require("../models/signature.request.model");

router.post("/new", async (req, res) => {
  try {
    const { recipient, subject, message, pdfFile, userId } = req.body;

    console.log(recipient);
    const recipientUser = await User.findOne({ email: recipient });
    console.log(recipientUser);

    if (recipientUser) {
      const newSignRequest = await SignatureRequest.create({
        recipient: { _id: recipientUser._id, displayName: recipientUser.name.displayName },
        subject,
        message,
        pdfFile,
        user: userId,
        status: "Pending",
      });
    }

    res.status(200).json({ data: "Success" });
  } catch (err) {
    console.log(err);
    res.status(404).json({ dataError: err });
  }
});

router.get("/:userId", async (req, res) => {
  SignatureRequest.find({ user: req.params.userId })
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
