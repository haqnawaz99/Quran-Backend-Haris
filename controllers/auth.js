const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const email = req.body.email;
    const password = req.body.password;

    let user = await User.findOne({ email }).select("+password");
    if (user) {
      await user.updateOne({ lock: false });
      user = user.toObject();
    //   user.lock = false;
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch)
        return res
          .status(400)
          .json({ msg: "This password is invalid. Please try again" });
      if (!user.access_portal)
        return res
          .status(400)
          .json({ msg: "your portal access has been revoked" });

      if (!user.verified)
      return res
        .status(400)
        .json({ msg: "your profile is not verified yet" });

      
      delete user.password;
      const payload = {
        user: {
          id: user._id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRY },
        async (err, token) => {
          if (err) throw err;
          res
            .status(200)
            .json({ user: user, token: token, msg: "User logged in" });
        }
      );
    } else {
      return res
        .status(400)
        .json({
          msg: "This email is invalid. Please enter a valid account email",
        });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Server Error" });
  }
};
