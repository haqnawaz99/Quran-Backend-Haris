const express = require('express');
const router = express.Router();
const { surahs, surahById } = require('../controllers/surahs');

router.route('/all').get(surahs);
router.route('/:id').get(surahById);
// router.route('/leads/:id').get(auth, getLeadsByAd);

module.exports = router;