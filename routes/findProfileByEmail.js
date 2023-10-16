const express = require("express");
const router = express.Router();
const profile = require("../Models/newProfile");
router.post("/findProfileByEmail", async (req, res) => {
  try {
    let foundProfile = await profile.findOne({ email: req.body.email });
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
