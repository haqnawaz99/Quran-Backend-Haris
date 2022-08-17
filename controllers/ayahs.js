const Ayah = require("../models/Ayah");
const paginator = require("../utils/paginator");
const { validationResult } = require("express-validator");

exports.ayahs = async (req, res) => {
  try {
    const total = await Ayah.countDocuments();
    const pagination = paginator(req.query.page, req.query.limit, total);
    let ayahs = await Ayah.find().sort({ AyaID: 1 });
    // .skip(pagination.start_index)
    // .limit(pagination.records_per_page);
    return res
      .status(200)
      .json({ msg: "list of ayahs", pagination, data: ayahs });
  } catch (err) {
    return res.status(500).json({ msg: "Server Error" });
  }
};

exports.ayahById = async (req, res) => {
  try {
    let ayah = await Ayah.findOne({ _id: req.params.id });
    if (!ayah)
      return res
        .status(404)
        .json({ msg: "no ayah exists against id: " + req.params.id });
    return res
      .status(200)
      .json({ msg: "ayah against id: " + req.params.id, data: ayah });
  } catch (err) {
    if (err.kind === "ObjectId")
      return res.status(400).json({ msg: "invalid id format" });
    return res.status(500).json({ msg: "Server Error" });
  }
};

exports.getAyahsBySurah = async (req, res) => {
  try {
    const total = await Ayah.countDocuments({ SuraID: req.params.id });
    const pagination = paginator(req.query.page, req.query.limit, total);
    let ayahs = await Ayah.find({ SuraID: req.params.id })
      .sort({ AyaID: 1 })
      .skip(pagination.start_index)
      .limit(pagination.records_per_page);
    return res.status(200).json({
      msg: "list of ayahs against surah: " + req.params.id,
      pagination,
      data: ayahs,
    });
  } catch (err) {
    return res.status(500).json({ msg: "Server Error" });
  }
};
exports.addNotestoAyah = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    let ayah = await Ayah.findOne({ _id: req.params.id });
    if (!ayah)
      return res.status(404).json({
        msg: "no Ayah exists against user id: " + req.params.id,
      });
    await ayah.updateOne({
      $push: {
        notes: {
          user: req.user._id,
          description: req.body.description,
        },
      },
    });
    return res.status(200).json({ msg: "Notes Added" });
  } catch (err) {
    console.log(err);
    if (err.kind === "ObjectId")
      return res.status(400).json({ msg: "invalid id format" });
    return res.status(500).json({ msg: "Server Error" });
  }
};
