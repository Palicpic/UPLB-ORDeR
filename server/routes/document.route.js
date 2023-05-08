const router = require("express").Router();
const DocSchema = require('../models/document.model');

router.post("/new", (req, res) => {
  try {
    console.log(req.body);
    const newDoc = new DocSchema(req.body).save();
    res.status(200).json({message: "success"});
  }catch (err) {
    console.log(err);
    res.status(404).json({dataError: err})
  }

})

//get all document
router.get("/", (req, res) => {
  DocSchema.find()
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));

    // try {
    //   DocSchema.find();
    //   res.status(200).json({message: "success"});
    // }catch (err) {
    //   console.log(err);
    //   res.status(400).json(err);
    // }
});

module.exports = router;