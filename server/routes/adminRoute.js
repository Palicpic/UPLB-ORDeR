const router = require("express").Router();
const College = require("../models/college");
const Document = require("../models/document");
const DocumentRequest = require("../models/documentRequest");
const User = require("../models/user");
const Contract = require("../models/contract");

//add new college
router.post("/new-college", (req, res) => {
  try {
    const newCollege = new College(req.body).save();
    res.status(200).json({ message: "success" });
  } catch (err) {
    console.log(err);
    res.status(404).json({ dataError: err });
  }
});

//get all colleges
router.get("/colleges", (req, res) => {
  College.find()
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});

//add new Document
router.post("/new-document", (req, res) => {
  try {
    const newDoc = new Document(req.body).save();
    res.status(200).json({ message: "success" });
  } catch (err) {
    console.log(err);
    res.status(404).json({ dataError: err });
  }
});

//get all document
router.get("/documents", (req, res) => {
  Document.find()
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});

//get all users
router.get("/users", (req, res) => {
  User.find()
    .sort({ college: 1 })
    .sort({ email: 1 })
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});

router.post("/user/edit-role/:id", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        role: req.body.roleValue,
      }
    );

    res.status(200).json({ data: "Success" });
  } catch (err) {
    console.log(err);
    res.status(404).json({ dataError: err });
  }
});

router.delete("/user/delete/:id", async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id });

    res.status(200).json({ data: "Success" });
  } catch (err) {
    console.log(err);
    res.status(404).json({ dataError: err });
  }
});

//get all contracts
router.get("/contracts", (req, res) => {
  Contract.find()
    .sort({ createdAt: -1 })
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});

//edit status of contracts
router.post("/contract/edit-status/:id", async (req, res) => {
  try {
    const contract = await Contract.findOneAndUpdate(
      { _id: req.params.id },
      {
        status: req.body.statusValue,
      }
    );

    res.status(200).json({ data: "Success" });
  } catch (err) {
    console.log(err);
    res.status(404).json({ dataError: err });
  }
});

module.exports = router;
