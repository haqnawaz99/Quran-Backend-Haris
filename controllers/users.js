const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const paginator = require("../utils/paginator");

exports.add = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    let checkUser = await User.findOne({ email: req.body.email });
    if (checkUser)
      return res
        .status(409)
        .json({ msg: "account with this email already exists" });
    let checkPhone = await User.findOne({ phone: req.body.phone });
    if (checkPhone)
      return res.status(409).json({ msg: "phone number already in use" });

    // var result = "";
    // var chars =
    //   "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // for (var i = 12; i > 0; --i)
    //   result += chars[Math.floor(Math.random() * chars.length)];

    const salt = await bcrypt.genSalt(10);
    let password = await bcrypt.hash(req.body.password, salt);
    let user = await User.create({
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      email: req.body.email,
      dob: req.body.dob,
      phone: req.body.phone,
      password: password,
    });

    if (!user)
      return res.status(500).json({
        msg: "Server Error",
        error: "An unknown error occured while creating user",
      });

    // accountRegistration(req.body.email, result);

    return res
      .status(201)
      .json({ msg: "user added successfully", data: user });
  } catch (err) {
    console.log(err);
    if (err.kind === "ObjectId")
      return res.status(400).json({ msg: "invalid id format" });
    return res.status(500).json({ msg: "Server Error" });
  }
};
exports.users = async (req, res) => {
  try {
    let superAdmins = await User.findOne({
        user_type: "super-admin",
    }).select("_id");

    const total = await User.countDocuments({
      _id: { $nin: superAdmins._id },
    });
    const pagination = paginator(req.query.page, req.query.limit, total);
    let users = await User.find({_id: { $nin: superAdmins._id }, })
      .sort({ created_at: -1 })
      .skip(pagination.start_index)
      .limit(pagination.records_per_page);
    return res
      .status(200)
      .json({ msg: "list of users", pagination, data: users });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Server Error" });
  }
};
exports.userById = async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.params.id });
    if (!user)
      return res
        .status(404)
        .json({ msg: "no user exists against id: " + req.params.id });

    user = user.toObject();
    return res
      .status(200)
      .json({ msg: "user against id: " + req.params.id, data: user });
  } catch (err) {
    console.log(err);
    if (err.kind === "ObjectId")
      return res.status(400).json({ msg: "invalid id format" });
    return res.status(500).json({ msg: "Server Error" });
  }
};
exports.update = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    let checkUser = await User.findOne({
      email: req.body.email,
      _id: { $ne: req.params.id },
    });
    if (checkUser)
      return res
        .status(409)
        .json({ msg: "account with this email already exists" });

    let checkPhone = await User.findOne({
      phone: req.body.phone,
      _id: { $ne: req.params.id },
    });
    if (checkPhone)
      return res.status(409).json({ msg: "phone number already in use" });
    await User.findByIdAndUpdate(req.params.id, {
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      email: req.body.email,
      dob: req.body.dob,
      phone: req.body.phone,  
    });

    return res.status(200).json({ msg: "profile updated successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Server Error" });
  }
};
exports.deleteuser = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user)
      return res
        .status(404)
        .json({ msg: "no user exists against id " + req.params.id });
    await user.remove();
    return res.status(200).json({ msg: "user deleted successfully" });
  } catch (err) {
    if (err.kind === "ObjectId")
      return res.status(400).json({ msg: "invalid id format" });
    return res.status(500).json({ msg: "Server Error" });
  }
};
exports.verifyProfile = async (req, res) => {
  try {
    User.findByIdAndUpdate(
      req.params.id,
      { verified: true },
      { new: true },
      async (err, updated) => {
        if (err)
          return res
            .status(400)
            .json({ msg: "error occured while verifying profile" });
        return res
          .status(200)
          .json({ msg: "user profile verified", data: updated });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Server Error" });
  }
};
exports.revokePortal = async (req, res) => {
  try {
    User.findByIdAndUpdate(
      req.params.id,
      { access_portal: false },
      { new: true },
      async (err, updated) => {
        if (err)
          return res
            .status(400)
            .json({ msg: "error occured while revoking portal" });
        return res.status(200).json({ msg: "portal revoked", data: updated });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Server Error" });
  }
};
exports.accessPortal = async (req, res) => {
  try {
    User.findByIdAndUpdate(
      req.params.id,
      { access_portal: true },
      { new: true },
      async (err, updated) => {
        if (err)
          return res
            .status(400)
            .json({ msg: "error occured while giving access for portal" });
        return res.status(200).json({
          msg: "portal access has been given to user ",
          data: updated,
        });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Server Error" });
  }
};
