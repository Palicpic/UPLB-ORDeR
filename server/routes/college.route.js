const router = require("express").Router();
const CollegeSchema = require("../models/college.model");

router.post("/new", (req, res) => {
  try {
    console.log(req.body);
    const newCollege = new CollegeSchema(req.body).save();
    res.status(200).json({ message: "success" });
  } catch (err) {
    console.log(err);
    res.status(404).json({ dataError: err });
  }
});

//get all colleges
router.get("/", (req, res) => {
  CollegeSchema.find()
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
