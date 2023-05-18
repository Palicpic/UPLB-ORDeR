const router = require("express").Router();
const User = require("../models/user.model");
const DocumentRequest = require("../models/doc.request.model");

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
    // .then((data) => console.log(data))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
