const router = require("express").Router();
const User = require("../models/user");
const Contract = require("../models/contract");

//get all users
router.get("/users", (req, res) => {
  User.find()
    .sort({ college: 1 })
    .sort({ email: 1 })
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});

//edit user role and/or college
router.post("/user/edit/:id", async (req, res) => {
  try {
    const { roleValue, collegeValue } = req.body;

    if (roleValue) {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        {
          role: roleValue,
        }
      );
    }

    if (collegeValue) {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        {
          college: collegeValue,
        }
      );
    }

    res.status(200).json({ data: "Success" });
  } catch (err) {
    console.log(err);
    res.status(404).json({ dataError: err });
  }
});

//delete user
router.delete("/user/delete/:id", async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({ data: "Success" });
  } catch (err) {
    console.log(err);
    res.status(404).json({ dataError: err });
  }
});

//get all contracts sorted by creation date
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
