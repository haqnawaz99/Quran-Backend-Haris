const express = require('express');
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middlewares/auth");
const { ayahs, ayahById ,getAyahsBySurah,addNotestoAyah} = require('../controllers/ayahs');

router.route('/all').get(ayahs);
router.route('/:id').get(ayahById);

router.route('/get-ayahs-by-surah/:id').get(getAyahsBySurah);

router.route("/add-note/:id").put(
    check("description", "Please Add valid note").not().isEmpty(),
    auth,
    addNotestoAyah
  );

module.exports = router;