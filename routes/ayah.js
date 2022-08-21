const express = require("express");

const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middlewares/auth");
const {
  ayahs,
  ayahById,
  getAyahsBySurah,
  addNotestoAyah,
  deleteNotestoAyah,
  updateNotestoAyah,
} = require("../controllers/ayahs");

router.route("/all").get(ayahs);
router.route("/:id").get(ayahById);

router.route("/get-ayahs-by-surah/:id").get(getAyahsBySurah);

router
  .route("/add-note/:id")
  .put(
    check("description", "Please Add valid note").not().isEmpty(),
    auth,
    addNotestoAyah
  );
router
  .route("/delete-note/:id")
  .delete(
    check("noteId", "Please Add valid noteId").not().isEmpty(),
    auth,
    deleteNotestoAyah
  );
router
  .route("/update-note/:id")
  .put(
    check("noteId", "Please Add valid noteId").not().isEmpty(),
    check("description", "Please Add valid description").not().isEmpty(),
    auth,
    updateNotestoAyah
  );

module.exports = router;
