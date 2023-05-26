const router = require("express").Router();

const User = require("../models/user");
const DocumentRequest = require("../models/documentRequest");

//new document request
router.post("/new-request", async (req, res) => {
  try {
    const { email, displayName, firstName, middleName, lastName, college, number, classification, saisNum, address, mobileNum, adviser, degreeProgram, contactPersonName, contactPersonAddress, contactPersonMobileNum, documentName, semester, acadYear, reasonChoice, otherDocName, otherReason } = req.body;

    const document = otherDocName === "" ? documentName : otherDocName;
    const reason = otherReason === "" ? reasonChoice : otherReason;

    const user = await User.findOneAndUpdate(
      { email },
      {
        name: {
          firstName,
          middleName,
          lastName,
          displayName,
        },
        college,
        student: {
          number,
          classification,
          saisNum,
          address,
          mobileNum,
          adviser,
          degreeProgram,
          contactPerson: {
            name: contactPersonName,
            address: contactPersonAddress,
            mobileNum: contactPersonMobileNum,
          },
        },
      }
    );

    //create new Document Request
    const newDocRequest = await DocumentRequest.create({
      document,
      semester,
      acadYear,
      reason,
      user: user._id,
      status: "Pending",
    });

    res.status(200).json({ data: "Success" });
  } catch (err) {
    console.log(err);
    res.status(404).json({ dataError: err });
  }
});

//get all document request per user
router.get("/request/:userId", async (req, res) => {
  DocumentRequest.find({ user: req.params.userId })
    .populate("user")
    .sort({ createdAt: -1 })
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});

//get all document request by college
router.get("/request-ocs/:userCollege", async (req, res) => {
  DocumentRequest.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $match: {
        "user.college": req.params.userCollege,
      },
    },
    { $sort: { createdAt: -1 } },
  ])
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});

//request is rejected
router.post("/issue-document/rejected", async (req, res) => {
  try {
    const { rowId, reasonForRejecting } = req.body;
    const status = "Denied";
    const documentRequest = await DocumentRequest.findOneAndUpdate(
      { _id: rowId },
      {
        reasonForRejecting,
        status,
      }
    );
    res.status(200).json({ data: "Success" });
  } catch (err) {
    console.log(err);
    res.status(404).json({ dataError: err });
  }
});

module.exports = router;
