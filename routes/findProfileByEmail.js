const express = require("express");
const router = express.Router();
var Profile = require("../models/profile");
router.post("/findProfileByEmail", async (req, res) => {
  try {
    let foundProfile = await Profile.findOne({ email: req.body.email });
    if (foundProfile == null) {
      res.json(null);
    } else {
      res.json({ body: foundProfile });
    }
  } catch (error) {
    console.log(error.message);
    res.send("Server Error", error.message);
  }
});
module.exports = router;
