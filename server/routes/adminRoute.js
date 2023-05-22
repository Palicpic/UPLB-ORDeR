const router = require("express").Router();
const College = require("../models/college");
const Document = require("../models/document");

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

module.exports = router;
