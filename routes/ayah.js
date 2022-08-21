const express = require("express");

const router = express.Router();
const { ayahs, ayahById, getAyahsBySurah } = require("../controllers/ayahs");

router.route("/all").get(ayahs);
router.route("/:id").get(ayahById);
router.route("/get-ayahs-by-surah/:id").get(getAyahsBySurah);

module.exports = router;
