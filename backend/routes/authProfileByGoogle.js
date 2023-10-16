const express = require("express");
const router = express.Router();
const User = require("../Models/user");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = "uhvgcdfz9876t566r#987jihh";

// LOGIN BY GOOGLE
router.post("/loginByGoogle", [body("email").isEmail()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let email = req.body.email;
    let googleUser = await User.findOne({ email });
    const tempPass = "98uygvhbjaV";
    const salt = await bcrypt.genSalt(10);
    let secPass = await bcrypt.hash(tempPass, salt);
    if (!googleUser) {
      await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      console.log("google user not found");
    } else {
      console.log("google user found");
    }
    let foundUser = await User.findOne({ email: req.body.email });
    console.log("founduser", foundUser);
    const data = {
      user: {
        id: foundUser.id,
      },
    };
    const authToken = jwt.sign(data, jwtSecret);
    res.json({ success: true, authToken: authToken });
  } catch (error) {
    console.log("error", error);
    res.json({ success: false });
  }
});
module.exports = router;
