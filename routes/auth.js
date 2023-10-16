const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const jwtSecret = "uhvgcdfz9876t566r#987jihh";
// SIGN UP
router.post(
  "/signup",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password", "incorrect password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const salt = await bcrypt.genSalt(10);
      let secPass = await bcrypt.hash(req.body.password, salt);
      //create a user
      await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      let user = await User.findOne({ email: req.body.email });
      console.log(user);
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);
// LOGIN
router.post(
  "/login",
  [
    body("email").isEmail(),
    body("password", "incorrect password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let email = req.body.email;
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: "try logging in with correct creds" });
      }
      const pwdCompare = await bcrypt.compare(req.body.password, user.password);
      if (!pwdCompare) {
        return res
          .status(400)
          .json({ errors: "try logging in with correct creds" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, jwtSecret);
      res.json({ success: true, authToken: authToken });
    } catch (error) {
      console.log("error", error);
      res.json({ success: false });
    }
  }
);
module.exports = router;
