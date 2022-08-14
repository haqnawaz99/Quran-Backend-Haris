const mongoose = require("mongoose");
const SurahSchema = new mongoose.Schema({
    SurahID: {
        type: Number,
        default: null
    },
    SurahIntro: {
        type: String,
        default: null
    },
    SurahNameE: {
        type: String,
        default: null
    },
    SurahNameU: {
        type: String,
        default: null
    },
    
    Nazool: {
        type: String,
        default: null
    }
});

module.exports = Surah = mongoose.model("surah", SurahSchema);