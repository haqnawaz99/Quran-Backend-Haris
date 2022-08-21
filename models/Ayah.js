const mongoose = require("mongoose");
const AyahSchema = new mongoose.Schema({
  AyaID: {
    type: Number,
    default: null,
  },
  SuraID: {
    type: Number,
    default: null,
  },
  notes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      description: {
        type: String,
        default: null,
      },
      timeStamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  AyaNo: {
    type: Number,
    default: null,
  },
  arabic_text: {
    type: String,
    default: null,
  },
  fateh_muhammad_jalandhri: {
    type: String,
    default: null,
  },
  mehmood_ul_hassan: {
    type: String,
    default: null,
  },
  dr_mohsin_khan: {
    type: String,
    default: null,
  },
  mufti_taqi_usmani: {
    type: String,
    default: null,
  },
  RakuID: {
    type: Number,
    default: null,
  },
  PRakuID: {
    type: Number,
    default: null,
  },
  ParaID: {
    type: Number,
    default: null,
  },
  AyatNoAraab: {
    type: String,
    default: null,
  },
  AyatAndTarjuma: {
    type: String,
    default: null,
  },
  TarjumaLafziDrFarhatHashmi: {
    type: String,
    default: null,
  },
  TarjumaLafziFahmulQuran: {
    type: String,
    default: null,
  },
  TarjumaLafziNazarAhmad: {
    type: String,
    default: null,
  },
});

module.exports = Ayah = mongoose.model("ayah", AyahSchema);
