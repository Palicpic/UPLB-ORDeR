const router = require("express").Router();
const DocumentRequestSchema = require("../models/doc.request.model");
const User = require("../models/user.model");
const Student = require("../models/student.model");
const DocumentRequest = require("../models/doc.request.model");

router.post("/new", async (req, res) => {
  try {
    const { documentName, semester, acadYear, otherDocName, reason, otherReason, email, displayName, college, studNum, classification, saisNum, address, mobileNum, adviser, degProg, contactName, contactPNum, contactAdd, idPic } = req.body;

    //find the user
    const user = await User.findOneAndUpdate({ email }, { email, displayName, college });

    //check if the user has existing student infor
    if (user.student) {
      //update information
      const student = await Student.findOneAndUpdate({ _id: user.student._id }, { studNum, classification, saisNum, address, mobileNum, adviser, degProg, contactName, contactPNum, contactAdd, idPic });
      // await student.updateOne({ student: student._id });
    } else {
      //create student

      const newStudent = await Student.create({
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
      });

      const student = await Student.findOne({ studNum });

      await user.updateOne({ student: student._id });
    }

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

module.exports = router;
