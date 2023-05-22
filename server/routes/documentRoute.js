const router = require("express").Router();
const User = require("../models/user");
const Student = require("../models/student");
const DocumentRequest = require("../models/documentRequest");

//new document request
router.post("/new-request", async (req, res) => {
  try {
    const { email, name, college, number, classification, saisNum, address, mobileNum, adviser, degreeProgram, contactPerson, idPic, document, semester, acadYear, reason } = req.body;

    const user = await User.findOne({ email });
    let studentId = user.student;

    //check if already have student data
    if (studentId) {
      //update data
      const student = await Student.findOneAndUpdate({ _id: studentId }, { number, classification, saisNum, address, mobileNum, adviser, degreeProgram, contactPerson, idPic });
    } else {
      //create new student
      const studentData = {
        number,
        classification,
        saisNum,
        address,
        mobileNum,
        adviser,
        degreeProgram,
        contactPerson,
        idPic,
      };

      await Student.create(studentData).then((data) => (studentId = data._id));
    }

    //update user data
    const userData = await User.findOneAndUpdate({ email }, { name, college, student: studentId });

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
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});

//get all document request by college
router.get("/:userCollege", async (req, res) => {
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
  ])
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
