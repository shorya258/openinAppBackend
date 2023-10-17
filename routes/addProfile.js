const express = require("express");
const router = express.Router();
var Profile = require("../models/profile");
router.post("/profileData", async (req, res) => {
  let data = req.body.profile_data;
  let eId = await Profile.findOne({ email: req.body.email });
  console.log(eId);
  if (eId === null) {
    try {
      await Profile.create({
        email: req.body.email,
        profile_data: data,
      }).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      console.log(error.message);
      res.send("Server Error", error.message);
    }
  } else {
    try {
      await Profile.findOneAndUpdate(
        { email: req.body.email },
        { profile_data: data }
      ).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      res.send("Server Error", error.message);
    }
  }
});
module.exports = router;
