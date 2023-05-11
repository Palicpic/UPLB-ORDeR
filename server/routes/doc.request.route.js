const router = require("express").Router();
const User = require("../models/user.model");
const DocumentRequest = require("../models/doc.request.model");

router.post("/new", async (req, res) => {
  try {
    const { documentName, semester, acadYear, otherDocName, reason, otherReason, email, name, college, studNum, classification, saisNum, address, mobileNum, adviser, degProg, contactName, contactPNum, contactAdd, idPic } = req.body;

    //find the user
    const user = await User.findOneAndUpdate(
      { email },
      {
        email,
        name,
        college,
        student: {
          studNum,
          classification,
          saisNum,
          address,
          mobileNum,
          adviser,
          degProg,
          contactName,
          contactPNum,
          contactAdd,
          idPic,
        },
      }
    );

    //create new document Request
    const newDocRequest = await DocumentRequest.create({
      documentName,
      semester,
      acadYear,
      otherDocName,
      reason,
      otherReason,
      user: user._id,
      status: "Pending",
    });
    res.status(200).json({ data: "Success" });
  } catch (err) {
    console.log(err);
    res.status(404).json({ dataError: err });
  }
});

router.get("/:userId", async (req, res) => {
  DocumentRequest.find({ user: req.params.userId })
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
