const Surah = require('../models/Surah');
// const Lead = require('../../models/Lead');
const paginator = require("../utils/paginator");

exports.surahs = async(req, res) => {
    try {
        const total = await Surah.countDocuments();
        const pagination = paginator(req.query.page, req.query.limit, total);
        let surahs = await Surah.find()
            .sort({ SurahID: 1 })
            .skip(pagination.start_index)
            .limit(pagination.records_per_page);
        return res.status(200).json({ msg: 'list of surahs', pagination, data: surahs })
    } catch (err) {
        return res.status(500).json({ msg: 'Server Error' })
    }
}

exports.surahById = async(req, res) => {
    try {
        let surah = await Surah.findOne({ SurahID: req.params.id});
        if (!surah) return res.status(404).json({ msg: 'no surah exists against id: ' + req.params.id })
        return res.status(200).json({ msg: 'surah against id: ' + req.params.id, data: surah })
    } catch (err) {
        if (err.kind === "ObjectId") return res.status(400).json({ msg: 'invalid id format' })
        return res.status(500).json({ msg: 'Server Error' })
    }
}

// exports.getLeadsByAd = async(req, res) => {
//     try {
//         const total = await Lead.countDocuments({ ad_id: req.params.id, active: true });
//         const pagination = paginator(req.query.page, req.query.limit, total);
//         let leads = await Lead.find({ ad_id: req.params.id, active: true })
//             .sort({ created_at: -1 })
//             .skip(pagination.start_index)
//             .limit(pagination.records_per_page);
//         return res.status(200).json({ msg: 'list of leads against ad: '+req.params.id, pagination, data: leads })
//     } catch (err) {
//         return res.status(500).json({ msg: 'Server Error' })
//     }
// }